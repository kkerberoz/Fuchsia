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
        v-for="Report in reportList"
        :key="Report.title"
        class="column is-narrow"
      >
        <report-item :ReportItem="Report"></report-item>
      </div>
      <report-item></report-item>
      <div class="container" v-if="!hasData">
        <h1 class="title has-text-primary">
          Don't have Report Review yet !
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
  import ReportItem from "./ReportItem";
  import Loading from "vue-loading-overlay";
  import { SpringSpinner } from "epic-spinners";
  export default {
    components: {
      ReportItem,
      Loading,
      SpringSpinner,
    },
    data() {
      return {
        isLoading: false,
      };
    },
    computed: {
      reportList() {
        //console.log(this.$store.getters["report/getReportList"]);
        return this.$store.getters["report/getReportList"];
      },
      hasData() {
        return this.reportList != null;
      },
    },

    async mounted() {
      this.isLoading = true;
      this.$store
        .dispatch("report/setReportList")
        .then(() => (this.isLoading = false));
      //console.log(this.$store.getters["report/getReportList"]);
    },
  };
</script>

<style scoped>
  .horizontal-container {
    display: flex;
    overflow-x: auto;
  }
</style>
