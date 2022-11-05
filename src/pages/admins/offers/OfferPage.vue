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
                <div class="text-label">Tag line</div>
                <base-input
                  placeholder="We raise your confidence"
                  v-model="offer.tag_line"
                />
              </div>
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Title line 1</div>
                <base-input
                  placeholder="Get Body In Shape And"
                  v-model="offer.title_line_1"
                />
              </div>
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Title line 2</div>
                <base-input
                  placeholder="Stay Healthy"
                  v-model="offer.title_line_2"
                />
              </div>
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Button</div>
                <base-input placeholder="OUR SERVICES" v-model="offer.button" />
              </div>
              <div class="col-xs-12 col-sm-4">
                <div class="text-label">Link</div>
                <base-input placeholder="https://" v-model="offer.link" />
              </div>
            </base-section>
          </div>
        </div>
        <div class="col-xs-12 col-sm-3">
          <base-section title="Thumbnail">
            <div class="col-xs-12">
              <file-selector
                accept="image/*"
                dialog-label="Upload thumbnail"
                hint="You can only choose images as thumbnail"
                load-from-server
                v-model="offer.thumbnail"
                :query="
                  (args) => ({
                    ...args,
                    type: 'image',
                  })
                "
              />
            </div>
            <div class="col-xs-12">
              <q-checkbox dense v-model="offer.is_active" label="Active" />
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
import { useOfferStore } from "stores/offer";
import FileSelector from "components/FileSelector.vue";

const offer = {
  thumbnail: null,
  is_active: true,
};

export default {
  components: {
    SkeletonSinglePage,
    FileSelector,
  },
  data() {
    return {
      default: cloneDeep(offer),
      offer: cloneDeep(offer),
      loaded: false,
      submited: false,
    };
  },
  methods: {
    ...mapActions(useOfferStore, ["store", "show", "update"]),
    onSubmit(props) {
      console.func(
        "pages/admins/offers/OfferPage:methods.onSubmit()",
        arguments
      );
      this.submited = true;
      const method = this.creating ? this.store : this.update;
      method(this.offer)
        .then(({ data, message }) => {
          this.submited = false;
          this.$q.notify(message);
          this.offer = data;
          this.default = cloneDeep(data);
          this.$router.push({
            name: "Single Offer",
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
        "pages/admins/offers/OfferPage:methods.onReset()",
        arguments
      );
      this.loaded = false;
      this.$nextTick(() => {
        this.offer = cloneDeep(this.default);
        this.loaded = true;
      });
    },
    onCancel(props) {
      console.func(
        "pages/admins/offers/OfferPage:methods.onCancel()",
        arguments
      );
      this.$router.go(-1);
    },
  },
  async mounted() {
    if (!this.creating) {
      this.show(this.id)
        .then((offer) => {
          this.offer = offer;
          this.default = cloneDeep(offer);
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
        JSON.stringify(this.offer) === JSON.stringify(this.default)
      );
    },
    resetable() {
      return (
        this.default &&
        JSON.stringify(this.offer) !== JSON.stringify(this.default)
      );
    },
  },
};
</script>
