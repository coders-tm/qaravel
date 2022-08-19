<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <add-post-card title="Add post" />
      <posts-list-card title="Posts" :options="postsOptions" />
    </div>
  </q-page>
</template>
<script>
import AddPostCard from "components/posts/AddPostCard.vue";
import PostsListCard from "components/posts/PostsListCard.vue";
export default {
  components: { AddPostCard, PostsListCard },
  data() {
    return {
      postsOptions: {
        currentPage: 1,
        lastPage: 1,
        rowsPerPage: 12,
        sortBy: "CREATED_AT_DESC",
        displayMode: "grid",
      },
    };
  },
};
</script>
