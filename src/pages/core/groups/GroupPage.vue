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
      <template v-slot:body>
        <div class="q-gutter-md">
          <base-section title="General information">
            <div class="col-xs-12 col-sm-12">
              <div class="text-label">Name</div>
              <q-input dense outlined v-model="group.name" type="text" />
            </div>
            <div class="col-xs-12">
              <div class="text-label">Description</div>
              <q-input dense outlined v-model="group.description" type="textarea" />
            </div>
          </base-section>
          <base-section
            no-row
            title="Permissions"
            description="Give staff access to your store by sending them an invitation. If you’re working with a designer, developer, or marketer, find out how to give collaborator access to your store."
          >
            <div class="row q-col-gutter-md">
              <div class="col-xs-12 col-sm-4" v-for="(item, index) in modules" :key="item.id">
                <permissions
                  v-model:permissions="group.permissions"
                  :edit="edit"
                  v-model:module="modules[index]"
                />
              </div>
            </div>
          </base-section>
        </div>
      </template>
    </base-form>
    <skeleton-single-page v-else />
  </q-page>
</template>

<script>
import { cloneDeep } from 'lodash';
import { mapActions } from 'vuex';
import baseSection from '../../../components/base/base-section.vue';
import permissions from 'components/permissions.vue';

const group = {
  permissions: [],
};

export default {
  components: {
    permissions,
    baseSection,
  },
  data() {
    return {
      default: cloneDeep(group),
      group: cloneDeep(group),
      modules: [],
      groups: [],
      selected: [],
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions('group', ['View', 'Store', 'Update']),
    ...mapActions('app', ['Modules']),
    onSubmit(props) {
      console.func('pages/core/groups/group:methods.onSubmit()', arguments);
      this.submited = true;
      if (this.creating) {
        this.Store(this.group)
          .then(({ data, message }) => {
            this.submited = false;
            this.$q.notify(message);
            this.group = data;
            this.default = cloneDeep(data);
            this.$router.push({
              name: 'groups.single',
              params: {
                id: data.id,
              },
              query: {
                action: 'edit',
              },
            });
          })
          .catch((error) => {
            this.submited = false;
            this.$core.error(error, { title: 'Error' });
          });
      } else {
        this.Update(this.group)
          .then(({ data, message }) => {
            this.submited = false;
            this.$q.notify(message);
            this.group = data;
            this.default = cloneDeep(data);
          })
          .catch((error) => {
            this.submited = false;
            this.$core.error(error, { title: 'Error' });
          });
      }
    },
    onReset(props) {
      console.func('pages/core/groups/group:methods.onReset()', arguments);
      this.loaded = false;
      setTimeout(() => {
        Object.assign(this.group, cloneDeep(this.default));
        this.loaded = true;
      }, 1);
    },
    onCancel(props) {
      console.func('pages/core/groups/group:methods.onCancel()', arguments);
      this.$router.go(-1);
    },
  },
  async mounted() {
    await this.Modules().then((data) => {
      this.modules = data.modules;
      this.groups = data.groups;
    });
    if (!this.creating) {
      this.View(this.id)
        .then((group) => {
          this.group = group;
          this.default = cloneDeep(group);
          this.loaded = true;
        })
        .catch((error) => {
          this.$emit('error', error);
        });
    } else {
      this.loaded = true;
    }
  },
  computed: {
    edit() {
      return ['add', 'edit'].includes(this.action) || this.id === 'add';
    },
    creating() {
      return this.id === 'add';
    },
    id() {
      return this.$route.params.id;
    },
    action() {
      return this.$route.query.action;
    },
    disable() {
      return this.default && JSON.stringify(this.group) === JSON.stringify(this.default);
    },
    resetable() {
      return this.default && JSON.stringify(this.group) !== JSON.stringify(this.default);
    },
  },
};
</script>
