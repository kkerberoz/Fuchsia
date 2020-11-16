<template>
  <section class="hero-body is-fullheight">
    <div  class="container" style="width: 77%">
      <b-field class="column">
          <b-select v-model="category" placeholder="Select a category" rounded>
              <option selected value="">All category</option>
              <option value="Camera">Camera</option>
              <option value="Natural">Natural</option>
              <option value="Shopping">Shopping</option>
              <option value="Food">Food</option>
              <option value="Drink">Drink</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Sports">Sports</option>
          </b-select>
      </b-field>
      <b-field>
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
    </div>
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
        category: "",
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
          if(this.category === ""){
            let keyObject = {
              filter: "reviewTitle",
              category: this.category,
              page: this.currentPage,
              word: this.searchKeyWord
            }
            this.$store.dispatch("review/getSearchReviewList", keyObject);
          }
          else {
            let keyObject = {
              filter: "reviewTitle",
              page: this.currentPage,
              word: this.searchKeyWord
            }
            this.$store.dispatch("review/getSearchReviewList", keyObject);
          }
          
        } 
        else {
          if(this.category === ""){
            let keyObject = {
              filter: "",
              category: this.category,
              page: this.currentPage,
            }
            this.$store.dispatch("review/getReviewList", keyObject);
          }
          else {
            let keyObject = {
              filter: "",
              page: this.currentPage,
            }
            this.$store.dispatch("review/getReviewList", keyObject);
          }
          
        }
      }
    },
    async mounted() {
      console.log("mounted");
      if(this.category !== ""){
        let keyObject = {
          filter: "",
          category: this.category,
          page: this.currentPage,
        }
        console.log("category")
        this.$store.dispatch("review/getReviewList", keyObject);
      }
      else {
        let keyObject = {
          filter: "",
          page: this.currentPage,
        }
        console.log("other")
        this.$store.dispatch("review/getReviewList", keyObject);
      }
      await this.$store.dispatch("review/setReviewCount");
      this.allReviewCount = this.$store.getters["review/getReviewCount"];
    },
    watch: {
      currentPage() {
        this.$store.dispatch("review/getReviewList", this.currentPage);
      },
      searchKeyWord() {
        this.$store.dispatch("review/setSearchKey", this.searchKeyWord);
        console.log(this.searchKeyWord)
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