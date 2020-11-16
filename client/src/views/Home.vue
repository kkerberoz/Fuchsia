<template>
  <section class="hero-body is-fullheight">
    <div class="container">
      <review-list :currentPage="currentPage"></review-list>
    </div>
    
    <div style="margin-top: 5%; color:white;">
    <b-pagination
        :total="allReviewCount"
        v-model="currentPage"
        range-before=3
        range-after=1
        order="is-centered"
        :simple ="isSimple"
        :rounded ="isRounded"
        per-page=20
        icon-prev="chevron-left"
        icon-next="chevron-right"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page">
    </b-pagination>
</div>
  </section>
</template>

<script>
import ReviewList from "../components/ReviewList";
  export default {
    name: "Home",
    components: {
      'review-list': ReviewList
    },
    data() {
      return {
        allReviewCount: 200,
        currentPage: 1,
        isSimple: false,
        isRounded: true
      }
    },
    mounted() {
      // this.$store.dispatch("review/getReviewList", this.currentPage);
      // console.log();
    },
    watch: {
      currentPage() {
        this.$store.dispatch("review/getReviewList", this.currentPage);
      }
    }
  };
</script>

<style lang="scss">
.pagination-link{
    color: #fff;
}
.pagination-link:hover{
    color: #fff;
    background-color: $secondary;
}
</style>