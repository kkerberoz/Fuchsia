<template>
  <div>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
      :opacity="0.9"
      :lock-scroll="true"
      :blur="'40px'"
    >
      <spring-spinner :animation-duration="2500" :size="60" color="#ff1d5e"
    /></loading>

    <section class="hero-body is-fullheight">
      <b-field class="container" style="width: 77%">
        <b-autocomplete
          style="width: 100%; margin: auto;"
          v-model="searchKeyWord"
          rounded
          placeholder="Search here . . ."
          v-debounce:400ms="searchBySearchBar"
          icon="magnify"
        >
        </b-autocomplete>
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
      <div class="container">
        <review-list :currentPage="currentPage"></review-list>
      </div>

      <div style="margin-top: 5%; color:white;">
        <div class="container" style="width:50%;">
          <b-pagination
            :total="allReviewCount"
            v-model="currentPage"
            range-before="3"
            range-after="1"
            order="is-centered"
            :simple="isSimple"
            :rounded="isRounded"
            per-page="20"
            icon-prev="chevron-left"
            icon-next="chevron-right"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
          </b-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import ReviewList from "../components/ReviewList";
  import Loading from "vue-loading-overlay";
  import { SpringSpinner } from "epic-spinners";
  export default {
    name: "Home",
    components: {
      "review-list": ReviewList,
      SpringSpinner,
      Loading,
    },
    data() {
      return {
        category: "",
        searchKeyWord: "",
        allReviewCount: 0,
        currentPage: 1,
        isSimple: false,
        isRounded: true,
        isLoading: false,
      };
    },
    methods: {
      searchBySearchBar() {
        this.isLoading = true;
        if (this.searchKeyWord != "") {
          if (this.category !== "") {
            let keyObject = {
              filter: "category",
              category: this.category,
              page: this.currentPage,
              word: this.searchKeyWord,
            };
            //console.log("category",this.category)
            this.$store
              .dispatch("review/getSearchReviewList", keyObject)
              .then(() => (this.isLoading = false));
          } else {
            let keyObject = {
              filter: "",
              page: this.currentPage,
              category: this.category,
              word: this.searchKeyWord,
            };
            this.$store
              .dispatch("review/getSearchReviewList", keyObject)
              .then(() => (this.isLoading = false));
          }
        } else {
          if (this.category !== "") {
            let keyObject = {
              filter: "category",
              category: this.category,
              page: this.currentPage,
            };
            // //console.log("category",this.category)
            this.$store
              .dispatch("review/getReviewList", keyObject)
              .then(() => (this.isLoading = false));
          } else {
            let keyObject = {
              filter: "",
              category: this.category,
              page: this.currentPage,
            };
            this.$store
              .dispatch("review/getReviewList", keyObject)
              .then(() => (this.isLoading = false));
          }
        }
      },
    },
    async mounted() {
      //console.log("mounted");
      this.isLoading = true;
      if (this.category !== "") {
        let keyObject = {
          filter: "category",
          category: this.category,
          page: this.currentPage,
        };
        // //console.log("category",this.category)
        this.$store
          .dispatch("review/getReviewList", keyObject)
          .then(() => (this.isLoading = false));
      } else {
        let keyObject = {
          filter: "",
          category: this.category,
          page: this.currentPage,
        };
        // //console.log("other")
        this.$store
          .dispatch("review/getReviewList", keyObject)
          .then(() => (this.isLoading = false));
      }
      await this.$store
        .dispatch("review/setReviewCount")
        .then(() => (this.isLoading = false));
      this.allReviewCount = this.$store.getters["review/getReviewCount"];
    },
    watch: {
      currentPage() {
        this.isLoading = true;
        if (this.category !== "") {
          let keyObject = {
            filter: "category",
            category: this.category,
            page: this.currentPage,
          };
          // //console.log("category",this.category)
          this.$store
            .dispatch("review/getReviewList", keyObject)
            .then(() => (this.isLoading = false));
        } else {
          let keyObject = {
            filter: "",
            category: this.category,
            page: this.currentPage,
          };
          // //console.log("other")
          this.$store
            .dispatch("review/getReviewList", keyObject)
            .then(() => (this.isLoading = false));
        }
      },
      searchKeyWord() {
        this.isLoading = true;
        this.$store
          .dispatch("review/setSearchKey", this.searchKeyWord)
          .then(() => (this.isLoading = false));
        //console.log(this.searchKeyWord)
      },
      category() {
        this.isLoading = true;
        if (this.searchKeyWord != "") {
          if (this.category !== "") {
            let keyObject = {
              filter: "category",
              category: this.category,
              page: this.currentPage,
              word: this.searchKeyWord,
            };
            // //console.log("category",this.category)
            this.$store
              .dispatch("review/getSearchReviewList", keyObject)
              .then(() => (this.isLoading = false));
          } else {
            let keyObject = {
              filter: "",
              page: this.currentPage,
              category: this.category,
              word: this.searchKeyWord,
            };
            this.$store
              .dispatch("review/getSearchReviewList", keyObject)
              .then(() => (this.isLoading = false));
          }
        } else {
          if (this.category !== "") {
            let keyObject = {
              filter: "category",
              category: this.category,
              page: this.currentPage,
            };
            // //console.log("category",this.category)
            this.$store
              .dispatch("review/getReviewList", keyObject)
              .then(() => (this.isLoading = false));
          } else {
            let keyObject = {
              filter: "",
              category: this.category,
              page: this.currentPage,
            };
            this.$store
              .dispatch("review/getReviewList", keyObject)
              .then(() => (this.isLoading = false));
          }
        }
      },
    },
  };
</script>

<style lang="scss">
  .pagination-link {
    color: $secondary;
    background-color: #fff;
  }
  .pagination-link:hover {
    color: #fff;
    background-color: $secondary;
  }
</style>
