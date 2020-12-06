<template>
  <section>
    <vio-list></vio-list>
  </section>
</template>

<script>
  import VioList from "../../components/Admin/VioList";
  export default {
    components: {
      VioList,
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
