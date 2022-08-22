<template>
  <base-section no-row class="posts-list-card">
    <template v-if="loaded">
      <div class="listings-section relative-position">
        <div
          :class="{
            'posts-cards q-col-gutter-md': true,
            row: isGridView,
            grid: isGridView,
            list: !isGridView,
          }"
        >
          <template v-if="hasData">
            <div
              v-for="(post, index) in rows"
              :key="index"
              class="col-md-3 col-sm-6 col-xs-12 posts--col"
            >
              <post-card flat bordered v-bind="post" />
            </div>
          </template>
          <template v-else>
            <div class="col-sm-12 col-xs-12 posts-list-card-col">
              <q-card flat square>
                <q-card-section style="height: 350px" class="flex flex-center">
                  <div class="text-center">
                    <q-icon
                      color="blue-grey-1"
                      size="120px"
                      name="fad fa-home"
                    />
                    <div class="text-grey">{{ noItemsLabel }}</div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </div>
        <q-inner-loading :showing="loading">
          <q-spinner-cube size="50px" color="primary" />
        </q-inner-loading>
      </div>
      <div v-if="hasPagination" class="q-mt-xl flex flex-center">
        <div class="pagination">
          <q-pagination
            class="q-gutter-x-sm"
            ellipses
            direction-links
            v-model="pagination.currentPage"
            @update:model-value="onChangePagination"
            :max="pagination.lastPage"
            :max-pages="4"
          />
        </div>
      </div>
    </template>
  </base-section>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { usePostsStore } from "stores/posts";
import PostCard from "./PostCard.vue";

const deafultOptions = {
  currentPage: 1,
  lastPage: 1,
  rowsPerPage: 12,
  sortBy: "CREATED_AT_DESC",
  displayMode: "grid",
};

export default {
  components: { PostCard },
  props: {
    options: {
      type: Object,
      default: () => deafultOptions,
    },
    useRouteQuery: Boolean,
    noItemsLabel: {
      type: String,
      default: "No posts found!",
    },
  },
  data() {
    return {
      loaded: false,
      loading: true,
      pagination: this.options,
      sortOptions: [
        {
          label: "Title A-Z",
          value: "TITLE_ASC",
        },
        {
          label: "Title Z-A",
          value: "TITLE_DESC",
        },
        {
          label: "Newest",
          value: "CREATED_AT_DESC",
        },
        {
          label: "Oldest",
          value: "CREATED_AT_ASC",
        },
      ],
    };
  },
  methods: {
    ...mapActions(usePostsStore, ["get"]),
    async onRequest(args) {
      console.func(
        "components/posts/ManagePostsCard:methods.onRequest()",
        arguments
      );
      this.loading = true;
      const { currentPage, rowsPerPage, sortBy } = args.pagination;
      this.get({
        page: currentPage,
        rowsPerPage,
        sortBy,
      })
        .then(({ meta }) => {
          this.loading = false;
          this.loaded = true;
          this.pagination.currentPage = meta.current_page;
          this.pagination.lastPage = meta.last_page;
        })
        .catch((error) => {
          this.loading = false;
          this.loaded = true;
          this.$core.error(error);
          this.$router.push({ name: "Login" });
        });
    },
    onChangePagination() {
      console.func(
        "components/posts/ManagePostsCard:methods.onChangePagination()",
        arguments
      );
      this.onRequest({
        pagination: this.pagination,
      });
    },
    onReset() {
      console.func(
        "components/posts/ManagePostsCard:methods.onReset()",
        arguments
      );
      this.$nextTick(() => {
        this.onRequest({
          pagination: deafultOptions,
        });
      });
    },
  },
  computed: {
    ...mapState(usePostsStore, ["rows"]),
    isGridView() {
      return this.pagination.displayMode === "grid";
    },
    hasData() {
      return this.rows.length;
    },
    hasPagination() {
      return this.pagination.lastPage > 1;
    },
  },
  async mounted() {
    await this.onRequest({
      pagination: this.pagination,
    });
  },
};
</script>
