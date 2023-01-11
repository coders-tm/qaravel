<template>
  <base-section no-row class="posts-list-card">
    <div class="listings-section relative-position">
      <div
        :class="{
          'posts-cards q-col-gutter-md': true,
          row: true,
          grid: true,
        }"
      >
        <div
          v-for="(post, index) in posts"
          :key="index"
          class="col-md-3 col-sm-6 col-xs-12 posts--col"
        >
          <post-card is-offline flat bordered v-bind="post" />
        </div>
      </div>
    </div>
  </base-section>
</template>

<script>
import { openDB } from "idb";
import { mapState } from "pinia";
import { useAppStore } from "stores/app";
import PostCard from "./PostCard.vue";

export default {
  components: { PostCard },
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapState(useAppStore, ["user"]),
    serviceWorkerSupported() {
      return "serviceWorker" in navigator;
    },
  },
  methods: {
    onLoad() {
      console.func(
        "components/posts/OfflinePostsCard:methods.onLoad()",
        arguments
      );
      openDB("workbox-background-sync").then((db) => {
        db.getAll("requests")
          .then((requests) => {
            requests
              .filter((request) => request.queueName == "createPostQueue")
              .forEach(async (request) => {
                this.$emit("update", true);
                const post = await JSON.parse(
                  new TextDecoder().decode(request.requestData.body)
                );
                const existPost = this.posts.find(
                  (post) => post.id === request.id
                );
                if (!existPost) {
                  this.posts.unshift({
                    id: request.id,
                    ...post,
                    offline: true,
                  });
                }
              });
          })
          .catch((error) => {
            console.log("Error accessing IndexedDB: ", error);
          });
      });
    },
    onListenPostUploaded() {
      console.func(
        "components/posts/OfflinePostsCard:methods.onListenPostUploaded()",
        arguments
      );
      if (this.serviceWorkerSupported) {
        const channel = new BroadcastChannel("sw-messages");
        channel.addEventListener("message", (event) => {
          console.log("Received", event.data);
          if (event.data.msg == "offline-post-uploaded") {
            this.posts = [];
            this.$emit("update", false);
          }
        });
      }
    },
  },
  mounted() {
    this.onListenPostUploaded();
  },
};
</script>
