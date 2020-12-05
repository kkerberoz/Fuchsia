<template>
  <div class="columns is-mobile is-multiline is-centered" v-if="hasReview">
    <div v-for="review in reviews" :key="review.title" class="column is-narrow">
        <review-item :reviewItem = "review"></review-item>
    </div>
  </div>
</template>

<script>
import ReviewItem from "./ReviewItem";
export default {
  components: {
    ReviewItem
  },
  props: {
    // reviews: {
    //   type: Object,
    //   required: false
    // },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    hasReview() {
      return true;
    },
    reviews() {
      return this.$store.getters["review/getReviewList"];
    }
  },
};
</script>

<style scoped>
.horizontal-container {
  display: flex;
  overflow-x: auto;
}
</style>
