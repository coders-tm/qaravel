<template>
  <base-section no-row class="add-post-card">
    <base-form @submit="onSubmit">
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-12">
          <base-label title="Title" required />
          <base-input v-model="post.title" />
        </div>
        <div class="col-xs-12 col-sm-12">
          <base-label title="Description" required />
          <base-input type="textarea" v-model="post.description" />
        </div>
      </div>
    </base-form>
  </base-section>
</template>

<script>
import { mapActions } from "pinia";
import { usePostsStore } from "stores/posts";
import { faker } from "@faker-js/faker";

export default {
  data() {
    return {
      post: {
        title: faker.lorem.lines(1),
        description: faker.lorem.paragraph(10),
      },
    };
  },
  computed: {
    backgroundSyncSupported() {
      return "serviceWorker" in navigator && "SyncManager" in window;
    },
  },
  methods: {
    ...mapActions(usePostsStore, ["store"]),
    onSubmit(args) {
      console.func(
        "components/posts/AddPostCard:methods.onSubmit()",
        arguments
      );
      this.store(this.post)
        .then(({ message, data }) => {
          this.post = {
            title: faker.lorem.lines(1),
            description: faker.lorem.paragraph(10),
          };
          this.$core.success(message);
          this.$emit("add", { ...data, offline: false });
        })
        .catch((error) => {
          if (!navigator.onLine && this.backgroundSyncSupported) {
            this.$emit("add", { ...this.post, offline: true });
            this.post = {
              title: faker.lorem.lines(1),
              description: faker.lorem.paragraph(10),
            };
            this.$core.success(
              "It will be synced with server when you will get back to online.",
              {
                title: "Post created in offline!",
                icon: "warning",
              }
            );
          } else {
            this.$core.error(error);
          }
        });
    },
  },
};
</script>
