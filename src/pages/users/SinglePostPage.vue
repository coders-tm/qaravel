<template>
  <q-page padding>
    <q-card v-if="loaded">
      <q-card-section>
        <div class="text-h6">{{ post.title }}</div>
        <div class="text-subtitle2">{{ post.user.name }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        {{ post.description }}
      </q-card-section>
    </q-card>
    <q-card v-else>
      <q-card-section>
        <q-skeleton animation="blink" type="text" />
        <q-skeleton width="150px" animation="blink" type="text" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-skeleton type="text" />
        <q-skeleton type="text" />
        <q-skeleton width="60%" type="text" />
      </q-card-section>
    </q-card>
    <q-toolbar>
      <q-space />
      <q-btn
        flat
        color="primary"
        icon="fal fa-arrow-left"
        label="Go back to posts"
        @click="$router.back()"
        class="q-mt-md"
      />
    </q-toolbar>
  </q-page>
</template>
<script>
import { mapActions } from "pinia";
import { usePostsStore } from "src/stores/posts";
export default {
  data() {
    return {
      post: {},
      loaded: false,
    };
  },
  methods: {
    ...mapActions(usePostsStore, ["show"]),
    onLoad() {
      console.func("pages/users/SinglePostPage:methods.onLoad()", arguments);
      this.loaded = false;
      this.show(this.id)
        .then((post) => {
          this.post = post;
          this.loaded = true;
        })
        .catch((error) => {
          this.$core.error(error);
          this.$router.push({
            name: "Posts",
          });
        });
    },
  },
  computed: {
    id() {
      return this.$route.params.post;
    },
  },
  mounted() {
    this.onLoad();
  },
  watch: {
    $route(to, from) {
      if (to.name === from.name) {
        this.onLoad();
      }
    },
  },
};
</script>
