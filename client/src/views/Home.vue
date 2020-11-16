<template>
  <section class="hero-body is-fullheight">
    <b-field class="container" style="width: 77%">
      <b-autocomplete
        v-model="searchKeyWord"
        rounded
        placeholder="Search here . . ."
        v-debounce:400ms="searchBySearchBar"
        icon="magnify"
        clearable
      >
      </b-autocomplete>
    </b-field>
    <div class="container">
      <review-list :currentPage="currentPage"></review-list>
    </div>
    
    <div style="margin-top: 5%; color:white;">

      <div class="container" style="width:50%;">
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
        searchKeyWord: "",
        allReviewCount: 0,
        currentPage: 1,
        isSimple: false,
        isRounded: true
      }
    },
    methods: {
      searchBySearchBar() {
        if (this.searchKeyWord != "") {
          this.$store.dispatch("review/getSearchReviewList", this.currentPage);
        } 
        else {
          this.$store.dispatch("review/getReviewList", this.currentPage);
        }
      }
    },
    async mounted() {
      this.$store.dispatch("review/getReviewList", this.currentPage);
      await this.$store.dispatch("review/setReviewCount");
      this.allReviewCount = this.$store.getters["review/getReviewCount"];
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