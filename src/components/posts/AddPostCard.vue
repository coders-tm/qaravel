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
  methods: {
    ...mapActions(usePostsStore, ["store"]),
    onSubmit(args) {
      console.func(
        "components/posts/AddPostCard:methods.onSubmit()",
        arguments
      );
      this.store(this.post)
        .then(({ message }) => {
          this.post = {
            title: faker.lorem.lines(1),
            description: faker.lorem.paragraph(10),
          };
          this.$core.success(message);
        })
        .catch((error) => {
          this.$core.error(error);
        });
    },
  },
};
</script>
