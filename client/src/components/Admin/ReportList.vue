<template>
  <div class="columns is-mobile is-multiline is-centered" v-if="hasData">
    <div
      v-for="Report in reportList"
      :key="Report.title"
      class="column is-narrow"
    >
      <report-item :ReportItem="Report"></report-item>
    </div>
    <report-item></report-item>
  </div>
</template>

<script>
  import ReportItem from "./ReportItem";
  export default {
    components: {
      ReportItem,
    },

    computed: {
      reportList() {
        return this.$store.getters["report/getReportList"];
      },
      hasData() {
        return this.reportList != null;
      },
    },

    async mounted() {
      this.$store.dispatch("report/setReportList");
      console.log(this.$store.getters["report/getReportList"]);
    },
  };
</script>

<style scoped>
  .horizontal-container {
    display: flex;
    overflow-x: auto;
  }
</style>
