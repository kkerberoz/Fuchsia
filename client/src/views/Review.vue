<template>
  <div class="container">
    <review-content :reviewId="reviewId"></review-content>
    <comment-list></comment-list>
  </div>
</template>

<script>
import ReviewContent from "../components/ReviewContent";
import CommentList from "../components/CommentList";
  export default {
    components: {
      ReviewContent,
      CommentList
    },
    props: {
      reviewId: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>