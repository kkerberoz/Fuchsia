<template>
  <div class="container">
    <div id="postBlog" class="container">
      
      <div class="columns">
        <div id="reviewContent" class="column">
          <div v-if="isOwner" style="margin:2% 3% 2% 3%;">
            <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
              <b-icon style="transform: rotate(90deg); cursor: pointer;" icon="dots-vertical" slot="trigger" ></b-icon>
              <b-dropdown-item aria-role="listitem" @click="deleteReview">Delete review</b-dropdown-item>
            </b-dropdown>
          </div>
          <h1 style="font-size: 5vh;">{{reviewInfo.reviewTitle}}</h1>
          <hr class="pink-line">
          <div style="margin-top: 5%;" v-html="reviewInfo.reviewContent">
            <!-- content -->
          </div>
          <b-rate 
            v-model="score"
            @change="rate"
            :show-score = "showScore"
            size="default"
            style="margin-top: 5%;"
          >dsds</b-rate>
          <hr class="pink-line">
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <h1 style="margin-left: 7%; color: #c6007e;">Post By: .........  dd/mm/yyyy</h1>
        </div>
        <div class="column" style="margin-right: 5%;">
          <h1 style="color: #c6007e;" class="is-pulled-right">
            <b-icon
              icon="assistant-photo"
              size="is-small">
            </b-icon>
            Report
          </h1>
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
    data() {
      return {
        showScore: true,
        score: 0,
      }
    },
    computed: {
      reviewInfo() {
        return this.$store.getters["review/getReviewInfo"];
      },
      isOwner() {
        //Compare _id API -----------------------------------------------------------------------------------------------------------
        return true;
      }
    },
    methods: {
      deleteReview() {
        //Delete review API ----------------------------------------------------------------------------------------------------------
      },
      rate() {
        this.$buefy.toast.open({
          message: 'Thanks for you Rate!',
          type: 'is-success'
        });
      }
    },
    mounted() {
      console.log(this.reviewId);
      this.$store.dispatch("review/getReviewInfo");
    },
  };
</script>

<style lang="scss" scoped>
  hr {
    margin: 0;
  }

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
    margin: 3% 3% 0 3%;
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
