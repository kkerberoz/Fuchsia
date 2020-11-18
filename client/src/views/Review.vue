<template>
  <div class="container">
    <div id="postBlog" class="container">
      <div class="columns">
        <div id="reviewContent" class="column">
          <h1 style="font-size: 5vh;">{{reviewInfo.reviewTitle}}</h1>
          <hr class="pink-line">
          <div  v-html="reviewInfo.reviewContent">
            <!-- content -->
          </div>
          <hr class="pink-line">
        </div>
      </div>
        
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      reviewId: {
        type: String,
        required: true
      }
    },
    computed: {
      reviewInfo() {
        return this.$store.getters["review/getReviewInfo"];
      }
    },
    mounted() {
      console.log(this.reviewId);
      this.$store.dispatch("review/getReviewInfo");
    },
  };
</script>

<style lang="scss" scoped>

  .pink-line {
      border-top: 1px solid $secondary;
  }

  .buttonGroup {
    display: flex;
    width: 100%;
    justify-content: flex-end;
  }

  .buttonControl {
    text-align: center;
    background-color: $primary;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    margin-right: 1%;
  }

  #reviewContent {
    margin: 3%;
  }

  #postBlog {
    margin-top: 5%;
    padding: 40px;
    background-image: url("../assets/svg/postBlog.svg#svgView(preserveAspectRatio(none))");
    background-size: cover;
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 1024px) {
    #postBlog {
      margin-top: 5%;
      padding: 20px;
      margin: 5px;
      border-radius: 50px;
      width: 100%;
      height: auto;
      background-image: none;
      background-color: white;
    }
  }
</style>
