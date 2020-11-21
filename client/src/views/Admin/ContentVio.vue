<template>
  <section>
    <vio-list></vio-list>
  </section>
</template>
<script>
  import Violist from "../../components/Admin/VioList";
  export default {
    components: {
      "vio-list": Violist,
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
