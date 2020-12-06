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
  </div>
</template>

<script>
  import ReportBar from "../../components/ReportBar";
  import Loading from "vue-loading-overlay";
  import { SpringSpinner } from "epic-spinners";
  export default {
    components: {
      ReportBar,
      Loading,
      SpringSpinner,
    },
    computed: {
      reportList() {
        return this.$store.getters["report/getReportList"];
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

<style lang="scss" scoped>
  .card {
    border-radius: 10px;
  }
</style>
