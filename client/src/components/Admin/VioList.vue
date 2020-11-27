<template>
  <div class="columns is-mobile is-multiline is-centered" v-if="hasData">
    <div v-for="violence in violenceList" :key="violence.title" class="column is-narrow">
        <vio-item :VioItem = "violence"></vio-item>
    </div>
    <vio-item></vio-item>
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
    computed: {
      violenceList() {
        return this.$store.getters["report/getViolenceList"];
      },
      hasData() {
        return this.violenceList != null;
      }
    },
    async mounted() {
      await this.$store.dispatch("report/setViolenceList" /* maybe something?*/);
    }
  };
</script>

<style scoped>
  .horizontal-container {
    display: flex;
    overflow-x: auto;
  }
</style>
