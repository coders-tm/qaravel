<template>
  <q-page padding>
    <base-form
      v-if="loaded"
      @submit="onSubmit"
      @cancel="onCancel"
      @reset="onReset"
      :resetable="resetable"
      :disable="disable"
      :submited="submited"
    >
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-9">
          <div class="q-gutter-md">
            <base-section title="General information">
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Name</div>
                <base-input v-model="instructor.name" />
              </div>
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Email Address</div>
                <base-input v-model="instructor.email" />
              </div>
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Phone Number</div>
                <base-input v-model="instructor.phone" />
              </div>
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Hours PW</div>
                <base-price-input v-model="instructor.hourspw" />
              </div>
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Rent PW</div>
                <base-price-input v-model="instructor.rentpw" />
              </div>
              <div class="col-xs-12 col-sm-12">
                <div class="text-label">Profile Info</div>
                <base-input type="textarea" v-model="instructor.description" />
              </div>
              <div class="col-xs-12">
                <url-list v-model="instructor.urls" />
              </div>
            </base-section>
            <base-section title="Classes" no-row>
              <base-input
                class="q-mb-md"
                placeholder="Search classes"
                debounce="500"
                @update:model-value="onBrowseClass"
              >
                <template v-slot:after>
                  <q-btn
                    @click="onBrowseClass('')"
                    no-caps
                    outline
                    padding="9px"
                    :style="{
                      width: '100px',
                    }"
                    color="primary"
                    label="Browse"
                  />
                </template>
              </base-input>
              <div>
                <base-table
                  ref="classes"
                  :columns="classes_columns"
                  :rows="instructor.classes"
                  hide-top
                  hide-pagination
                  :rows-per-page-options="[0]"
                  no-data-label="No classes avaialble"
                  loaded
                >
                  <template v-slot:body-cell-name="props">
                    <base-btn
                      @click.stop
                      link
                      size="12px"
                      tag="a"
                      :to="{
                        name: 'Single Class',
                        params: {
                          id: props.row.id,
                        },
                        query: {
                          action: 'edit',
                        },
                      }"
                    >
                      {{ props.value }}
                    </base-btn>
                  </template>
                  <template v-slot:body-cell-cost="props">
                    <base-price-input
                      dense
                      borderless
                      @click.stop
                      v-model="props.row.pivot.cost"
                    />
                  </template>
                  <template v-slot:actions="props">
                    <q-btn
                      @click.stop="onRemoveClass(props)"
                      size="sm"
                      round
                      flat
                      color="grey"
                      icon="fas fa-trash-can"
                    />
                  </template>
                </base-table>
              </div>
            </base-section>
          </div>
        </div>
        <div class="col-xs-12 col-sm-3">
          <base-section title="Profile settings">
            <div class="col-xs-12">
              <div class="text-label">Avatar</div>
              <file-selector
                accept="image/*"
                dialog-label="Upload avatar"
                hint="You can only choose images as avatar"
                load-from-server
                v-model="instructor.avatar"
                :query="
                  (args) => ({
                    ...args,
                    type: 'image',
                  })
                "
              />
            </div>
            <div class="col-xs-12">
              <div class="text-label">Status</div>
              <q-select
                v-model="instructor.status"
                :options="['Active', 'Deactive', 'Hold']"
                dense
                outlined
              />
            </div>
            <div class="col-xs-12">
              <q-checkbox
                dense
                v-model="instructor.is_pt"
                label="Personal trainer"
              />
            </div>
            <div class="col-xs-12">
              <q-checkbox
                dense
                v-model="instructor.insurance"
                label="Insurance"
              />
            </div>
            <div class="col-xs-12">
              <q-checkbox
                dense
                v-model="instructor.qualification"
                label="Qualification"
              />
            </div>
            <div class="col-xs-12">
              <base-checkbox
                no-inline
                dense
                v-model="instructor.has_onlinefolder"
              >
                <div>Online folder</div>
                <base-input
                  class="q-mt-sm"
                  placeholder="https://example.com"
                  v-show="instructor.has_onlinefolder"
                  v-model="instructor.onlinefolder"
                />
              </base-checkbox>
            </div>
          </base-section>
        </div>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from "lodash";
import { mapActions } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useInstructorStore } from "stores/instructor";
import UrlList from "components/UrlList.vue";
import ClassSelector from "components/ClassSelector.vue";
import FileSelector from "components/FileSelector.vue";

const instructor = {
  status: "Active",
  avatar: null,
  urls: [],
  is_pt: false,
  insurance: false,
  qualification: false,
  has_onlinefolder: false,
};

export default {
  components: {
    SkeletonSinglePage,
    UrlList,
    FileSelector,
  },
  data() {
    return {
      default: cloneDeep(instructor),
      instructor: cloneDeep(instructor),
      loaded: false,
      submited: false,
      classes_columns: [
        {
          name: "name",
          align: "left",
          label: "Class",
          field: "name",
          style: "width: 100px",
          sortable: true,
        },
        {
          name: "cost",
          align: "left",
          label: "Cost",
          field: (row) => row.pivot.cost,
          format: (val) => this.$core.money(val),
          sortable: true,
        },
        {
          name: "actions",
          align: "right",
          label: "",
          field: "actions",
        },
      ],
    };
  },
  methods: {
    ...mapActions(useInstructorStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/admins/instructors/InstructorPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.instructor)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.instructor = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Instructor",
            params: {
              id: data.id,
            },
            query: {
              action: "edit",
            },
          });
        })
        .catch((error) => {
          this.submited = false;
          this.$core.error(error, { title: "Error" });
        });
    },
    onReset(props) {
      console.func(
        "pages/admins/instructors/InstructorPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.instructor = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/instructors/InstructorPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
    onBrowseClass(value) {
      console.func(
        "pages/admins/instructors/InstructorPage:methods.onBrowseClass()",
        arguments
      );
      this.$q
        .dialog({
          component: ClassSelector,
          componentProps: {
            query: value,
            modelValue: this.instructor.classes,
          },
        })
        .onOk((playload) => {
          console.func(
            "pages/admins/instructors/InstructorPage:methods.onBrowseClass.onOk()",
            playload
          );
          this.instructor.classes = playload;
        });
    },
    onRemoveClass({ rowIndex }) {
      console.func(
        "pages/admins/instructors/InstructorPage:methods.onRemoveClass()",
        arguments
      );
      this.instructor.classes.splice(rowIndex, 1);
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((instructor) => {
          this.instructor = instructor;
          this.default = cloneDeep(instructor);
          this.loaded = true;
        })
        .catch((error) => {
          this.$emit("error", error);
        });
    } else {
      this.loaded = true;
    }
  },
  computed: {
    edit() {
      return ["add", "edit"].includes(this.action) || this.id === "add";
    },
    creating() {
      return this.id === "add";
    },
    id() {
      return this.$route.params.id;
    },
    action() {
      return this.$route.query.action;
    },
    disable() {
      return (
        this.default &&
        JSON.stringify(this.instructor) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.instructor) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
