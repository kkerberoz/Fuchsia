<template>
  <div class="container">
    <div class="comment">
      <div v-if="isOwner || isOwner2" style="margin:2% 3% 2% 3%;">
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
          <b-dropdown-item aria-role="listitem" @click="deleteComment"
            >Delete comment</b-dropdown-item
          >
        </b-dropdown>
      </div>
      <div class="columns">
        <div class="column is-2" style="margin: 5% 0 0 4%">
          <div style="width: 17vh; height: 17vh;">
            <div class="profile"></div>
          </div>
        </div>
        <div class="column is-9" style="position: relative;">
          <div style="font-size: 3vh; color: #c6007e;">{{ username }}</div>
          <div
            style="margin: 0;
                    position: absolute;
                    top: 50%;
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);"
          >
            {{ comment.commentContent }}
          </div>
          <div
            style="color: #c6007e; display: flex; width: 100%; justify-content: flex-end; margin: 0; position: absolute; top: 85%;"
          >
            {{ date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    props: {
      comment: {
        type: Object,
        required: true,
      },
      isOwner: {
        type: Boolean,
        required: true,
      },
      reviewId: {
        type: String,
        required: true,
      },
      userData: {
        type: Object,
        required: false,
      },
    },
    data() {
      return {
        username: "",
      };
    },
    computed: {
      date() {
        return this.comment.commentDatetime.replace("T", " ").slice(0, 19);
      },
      isOwner2() {
        if (this.userData != null && this.comment != null) {
          return this.userData._id === this.comment.userId;
        }
        return false;
      },
    },
    methods: {
      deleteComment() {
        //console.log("delete commment", this.comment._id);
        axios
          .post("/api/deletecomment", {
            commentId: this.comment._id,
          })
          .then((res) => {
            if (res.status === 200) {
              //console.log("status delete:", res);
              this.$store.dispatch("review/setCommentList", this.reviewId);
              this.$buefy.toast.open({
                message: "Comment was deleted.",
                type: "is-success",
              });
            }
          })
          .catch((err) => {
            this.$buefy.toast.open({
              message: "Something went wrong!",
              type: "is-danger",
            });
            throw new err();
            //console.log(err);
          });
      },
    },
    async mounted() {
      const params = {
        userId: this.comment.userId,
      };
      // //console.log("@@",this.comment.userId)
      const response = await axios.get("/api/getuserbyid", {
        params,
      });
      this.username = response.data.data.username;
      //console.log("this is comment data", this.comment);
    },
  };
</script>

<style lang="scss">
  .comment {
    padding: 50px;
    background-image: url("../assets/svg/commentBox.svg#svgView(preserveAspectRatio(none))");
    background-size: cover;
    width: 100%;
    height: 100%;
    margin-top: 2%;
    border-radius: 20px;
  }
  @media screen and (max-width: 1024px) {
    .comment {
      padding: 50px;
      border-radius: 30px;
      width: 100%;
      height: 100%;
      background-image: none;
      background-color: white;
    }
  }

  .profile {
    border-radius: 50%;
    background-image: url("../assets/profile.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 130% 100%;
    width: 70%;
    height: 70%;
  }
</style>
