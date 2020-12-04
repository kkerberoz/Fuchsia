<template>
  <div class="container" v-if="hasData">
    <div id="postBlog" class="container">
      <div class="columns">
        <div id="reviewContent" class="column">
          <div v-if="isOwner" style="margin:2% 3% 2% 3%;">
            <b-dropdown
              aria-role="list"
              class="is-pulled-right"
              position="is-bottom-left"
            >
              <b-icon
                style="transform: rotate(90deg); cursor: pointer;"
                icon="dots-vertical"
                slot="trigger"
              ></b-icon>
              <b-dropdown-item aria-role="listitem" @click="deleteReview"
                >Delete review</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <h1 style="font-size: 5vh;">{{ reviewInfo.reviewTitle }}</h1>
          <hr class="pink-line" />

          <div
            style="margin-top: 5%;"
            v-html="reviewInfo.reviewContent"
            class="contentReview"
          >
            <!-- content -->
          </div>

          <b-rate
            v-model="score"
            :show-score="showScore"
            size="default"
            style="margin-top: 5%;"
          ></b-rate>
          <hr class="pink-line" />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <h1 v-if="hasUserData" style="margin-left: 7%; color: #c6007e;">
            Post By: {{ usernameOwner }} {{ datetime }}
          </h1>
        </div>
        <div class="column" style="margin-right: 5%; cursor:pointer;">
          <h1 @click="report" style="color: #c6007e;" class="is-pulled-right">
            <i class="fas fa-flag"></i>
            Report
          </h1>
        </div>
      </div>
    </div>
    <div class="comment-group">
      <comment-list
        :userData="userData"
        :reviewId="reviewId"
        :userId_in_review="reviewInfo.userId"
      ></comment-list>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import CommentList from "../components/CommentList";
  export default {
    components: {
      CommentList,
    },
    props: {
      reviewId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isOwner: false,
        showScore: true,
        score: 0,
        userData: null,
        scoreFlag: false,
        isLoadedCount: 0,
      };
    },
    computed: {
      hasData() {
        return this.reviewInfo != null && this.usernameOwner != null;
      },
      datetime() {
        const datetimeObj = new Date(this.reviewInfo.reviewDatetime);
        const date = datetimeObj.getDate();
        const month = datetimeObj.getMonth() + 1;
        const year = datetimeObj.getFullYear();
        return `${date}-${month}-${year}`;
      },
      usernameOwner() {
        return this.$store.getters["review/getReviewInfo"].userInfo.username;
      },
      reviewInfo() {
        return this.$store.getters["review/getReviewInfo"].reviewInfo;
      },
      hasUserData() {
        return this.userData != null;
      },
    },
    methods: {
      async report() {
        this.$swal({
          title: "Are you sure?",
          text: "Determine the reason of reporting.",
          icon: "warning",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "Yes, report it!",
          cancelButtonText: "Cancel!",
          preConfirm: (reason) => {
            const params = {
              reportReason: reason,
              reviewId: this.reviewId,
            };
            const jwt_token = JSON.parse(localStorage.getItem("jwt"));
            if (!jwt_token) {
              return;
            }
            axios
              .post("/api/postreport", params, {
                headers: { Authorization: jwt_token },
              })
              .then(() => {
                this.$swal({
                  title: "Reported to Admin.",
                  icon: "success",
                  confirmButtonColor: " #c6007e",
                });
              })
              .catch(() => {
                this.$swal({
                  title: "Something wrong!",
                  text: "Please fill the reason",
                  icon: "error",
                  confirmButtonColor: " #c6007e",
                });
              });
          },
          confirmButtonColor: " #c6007e",
        });
      },
      async deleteReview() {
        this.$swal({
          title: "Are you sure?",
          text: "This review will be deleted!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel!",
          confirmButtonColor: " #c6007e",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .post("/api/deletereview", {
                reviewId: this.reviewId,
              })
              .then((response) => {
                if (response.status === 200) {
                  this.$swal({
                    title: "Delete Complete.",
                    icon: "success",
                    confirmButtonColor: " #c6007e",
                  }).then(() => {
                    this.$router.push({ name: "Home" });
                  });
                }
              });
          }
        });

        //Delete review API -------------------------------------------------------------------------------------------
      },
    },
    async mounted() {
      this.scoreFlag = false;
      await this.$store.dispatch("review/getReviewInfo", this.reviewId);
      await this.$store.dispatch("review/setCommentList", this.reviewId);
      const jwt_token = JSON.parse(localStorage.getItem("jwt"));
      if (!jwt_token) {
        return;
      }
      const response = await axios.get("api/getuser", {
        headers: { Authorization: jwt_token },
      });
      //console.log("this is res", response.data);
      this.userData = response.data.data;
      // console.log(this.reviewInfo);
      this.isOwner =
        this.reviewInfo.userId === response.data.data._id ? true : false;

      const params = {
        userId: this.userData._id,
        reviewId: this.reviewId,
      };
      const res = await axios.get("/api/getfavoritescore", {
        params,
      });
      if (res.data.data.favoriteScore != null) {
        //console.log("!", res.data.data.favoriteScore.score);
        this.score = res.data.data.favoriteScore.score;
      } else {
        this.isLoadedCount++;
      }
      this.scoreFlag = true;
      console.log(res.data.data.favoriteScore, "!!");
    },
    watch: {
      reviewInfo() {
        if (this.reviewInfo != null && this.userData != null) {
          this.isOwner =
            this.reviewInfo.userId === this.userData._id ? true : false;
        }
      },
      score() {
        if (this.scoreFlag && this.isLoadedCount > 0) {
          console.log("True");
          const jwt_token = JSON.parse(localStorage.getItem("jwt"));
          if (!jwt_token) {
            return;
          }

          let data = {
            reviewId: this.reviewId,
            score: this.score,
          };
          console.log(data);
          axios
            .post("/api/postfavorite", data, {
              headers: { Authorization: jwt_token },
            })
            .then(() => {
              this.$buefy.toast.open({
                message: "Thanks for you Rate!",
                type: "is-success",
              });
            })
            .catch((err) => {
              throw new err();
              //console.log(err);
            });
        }
        this.isLoadedCount++;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .contentReview p > img {
    width: 100%;
    height: 100px;
  }

  hr {
    margin: 0;
  }

  .comment-group {
    margin-top: 4%;
    padding: 0 40px 40px 0;
    width: 100%;
    height: auto;
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

  #reviewContent p > img {
    width: 100%;
    height: 100px;
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
