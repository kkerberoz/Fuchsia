<template>
  <div class="columns is-mobile is-multiline is-centered" v-if="hasReview">
    <div v-for="review in 10" :key="review" class="column is-narrow">
        <review-item :review="review"></review-item>
    </div>
  </div>
</template>

<script>
// <review-item :review="review"></review-item>
import ReviewList from "./ReviewItem";
export default {
  components: {
    "review-item": ReviewList,
  },
  computed: {
    hasReview() {
      return true;
    },
  },
};
</script>

<style scoped>
.horizontal-container {
  display: flex;
  overflow-x: auto;
}
</style>
