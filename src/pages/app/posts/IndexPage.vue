<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <add-post-card @add="onAdd" title="Add post" />
      <keep-alive>
        <offline-posts-card
          v-show="hasOfflinePost"
          ref="offlinePosts"
          @update="onSyncOffline"
          title="Offline posts"
        />
      </keep-alive>
      <posts-list-card ref="Posts" title="Posts" :options="postsOptions" />
    </div>
  </q-page>
</template>

<script>
import AddPostCard from "components/posts/AddPostCard.vue";
import PostsListCard from "components/posts/PostsListCard.vue";
import OfflinePostsCard from "components/posts/OfflinePostsCard.vue";

export default {
  components: { AddPostCard, PostsListCard, OfflinePostsCard },
  data() {
    return {
      hasOfflinePost: false,
      postsOptions: {
        currentPage: 1,
        lastPage: 1,
        rowsPerPage: 12,
        sortBy: "CREATED_AT_DESC",
        displayMode: "grid",
      },
    };
  },
  methods: {
    onSyncOffline(args) {
      console.func(
        "pages/app/posts/IndexPage:methods.onSyncOffline()",
        arguments
      );
      this.hasOfflinePost = args;
      if (!args) {
        this.$refs.Posts.onReset();
      }
    },
    onAdd({ offline }) {
      console.func("pages/app/posts/IndexPage:methods.onAdd()", arguments);
      if (offline) {
        this.$refs.offlinePosts.onLoad();
      } else {
        this.$refs.Posts.onReset();
      }
    },
  },
};
</script>
