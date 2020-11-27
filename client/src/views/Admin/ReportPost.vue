<template>
  <section>
    <report-list></report-list>
  </section>
</template>

<script>
  import ReportList from "../../components/Admin/ReportList";
  export default {
    components: {
      ReportList,
    },
  };
</script>

<style scoped>
  .error-style-page {
    color: black;
    text-align: center;
    font-size: 300%;
  }
</style>
