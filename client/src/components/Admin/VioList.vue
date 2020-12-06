<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :opacity="0.9"
      :lock-scroll="true"
      :blur="'40px'"
    >
      <spring-spinner :animation-duration="2500" :size="60" color="#ff1d5e"
    /></loading>
    <div class="columns is-mobile is-multiline is-centered" v-if="hasData">
      <div
        v-for="violence in violenceList"
        :key="violence.title"
        class="column is-narrow"
      >
        <vio-item :VioItem="violence"></vio-item>
      </div>
      <vio-item></vio-item>
    </div>
    <div class="container is-mobile is-multiline is-centered " v-if="!hasData">
      <h1 class="title has-text-primary">
        Don't have Violence Content yet !
      </h1>
    </div>
  </div>
</template>

<script>
  import VioItem from "./VioItem";
  import Loading from "vue-loading-overlay";
  import { SpringSpinner } from "epic-spinners";
  export default {
    data() {
      return {
        isLoading: false,
      };
    },
    components: {
      VioItem,
      Loading,
      SpringSpinner,
    },
    props: {
      // currentPage: {
      //   type: Number,
      //   required: true,
      // },
    },
    computed: {
      violenceList() {
        return this.$store.getters["report/getViolenceList"];
      },
      hasData() {
        return this.violenceList.length != 0;
      },
    },
    async mounted() {
      this.isLoading = true;
      await this.$store
        .dispatch("report/setViolenceList")
        .then(() => (this.isLoading = false));
    },
  };
</script>

<style scoped>
  .horizontal-container {
    display: flex;
    overflow-x: auto;
  }
</style>
