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
      ref="baseForm"
    >
      <div class="q-gutter-md">
        <base-section title="General information">
          <div class="col-xs-12 col-sm-12">
            <div class="text-label">Label</div>
            <q-input dense outlined v-model="template.label" type="text" />
          </div>
          <div class="col-xs-12">
            <q-checkbox
              dense
              v-model="template.is_active"
              label="Active"
              color="green"
            />
          </div>
        </base-section>
        <base-section
          title="Template schedules"
          description="Template class schedules will be use to changed bulk week class schedules."
          no-row
        >
          <div class="q-pt-sm q-gutter-y-xs">
            <class-schedules
              v-for="(item, index) in template.schedules"
              :key="index"
              :day="index"
              v-model:rows="template.schedules[index]"
              group="schedules"
              :default-opened="index === 'Monday'"
              :can-save="!disable"
              @save="$refs.baseForm.onSave()"
            />
          </div>
        </base-section>
      </div>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep, groupBy } from "lodash";
import { mapActions } from "pinia";
import SkeletonSinglePage from "components/skeleton/SkeletonSinglePage.vue";
import { useTemplateStore } from "stores/template";
import ClassSchedules from "components/ClassSchedules.vue";

const defaultClassSchedule = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const template = {
  is_active: true,
  schedules: defaultClassSchedule,
};

const processData = (data) => {
  let schedules = groupBy(data.schedules, (schedule) => schedule.day);
  let classSchedules = cloneDeep(defaultClassSchedule);
  Object.keys(classSchedules).forEach((item) => {
    classSchedules[item] = schedules[item] || [];
  });
  return Object.assign(cloneDeep(data), {
    schedules: classSchedules,
  });
};

export default {
  components: {
    SkeletonSinglePage,
    ClassSchedules,
  },
  data() {
    return {
      default: cloneDeep(template),
      template: cloneDeep(template),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useTemplateStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/admins/templates/TemplatePage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;

      // create clone template
      const template = cloneDeep(this.template);

      // merge the schedules
      const schedules = Object.values(template.schedules);
      template.schedules = [].concat(...schedules);

      method(template)
        .then(({ data, message }) => {
          this.submited = false;

          this.loaded = false;
          this.$nextTick(() => {
            const templateData = processData(data);
            this.template = templateData;
            this.default = cloneDeep(templateData);
            this.loaded = true;
          });

          this.$q.notify(message);
          this.$router.push({
            name: "Single Template",
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
        "pages/admins/templates/TemplatePage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.template = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/templates/TemplatePage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((data) => {
          const template = processData(data);
          this.template = template;
          this.default = cloneDeep(template);
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
        JSON.stringify(this.template) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.template) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
