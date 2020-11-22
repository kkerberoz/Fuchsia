<template>
  <div class="columns is-mobile is-multiline is-centered">
    <VioItem></VioItem>
  </div>
</template>

<script>
  import VioItem from "./VioItem";
  export default {
    components: {
      VioItem,
    },
    props: {
      // currentPage: {
      //   type: Number,
      //   required: true,
      // },
    },
    computed: {},
  };
</script>

<style scoped>
  .horizontal-container {
    display: flex;
    overflow-x: auto;
  }
</style>
