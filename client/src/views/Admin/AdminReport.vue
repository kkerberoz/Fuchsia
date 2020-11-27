<template>
  <div class="container" style="margin-top:40px">
    <div class="title">Report</div>
    <section class="section">
      <div class="container">
        <ReportBar />
        <section class="section">
          <router-view />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  import ReportBar from "../../components/ReportBar";
  export default {
    components: {
      ReportBar,
    },
    computed: {
      reportList() {
        return this.$store.getters["report/getReportList"];
      },
    },
    async mounted() {
      this.$store.dispatch("report/setReportList");
      console.log(this.$store.getters["report/getReportList"]);
    },
  };
</script>

<style lang="scss" scoped>
  .card {
    border-radius: 10px;
  }
</style>
