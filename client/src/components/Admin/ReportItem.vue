<template>
  <div>
    <div class="card-container" v-if="hasData">
      <div class="card" style="border-radius:20px;width:403; height:272;">
        <div class="card-content">
          <br />
          <div class="content ">
            <div class="columns">
              <div class="column" style="padding:20px">
                <p class="has-text-grey">PostID:</p>
                <p>
                  {{ ReportItem.reportInfo.reviewId }}
                </p>
                <p class="has-text-grey">Post Date:</p>
                <p>
                  {{ date }}
                </p>
                <p class="has-text-grey">Reason:</p>
                <p>
                  {{ ReportItem.reportInfo.reportReason }}
                </p>
                <p class="has-text-grey">Post By:</p>
                <p>
                  {{ ReportItem.userInfo.username }}
                </p>
              </div>
              <div class="column">
                <div class="btn-container">
                  <button
                    class="button"
                    style="margin-left:80px"
                    @click="alert"
                  >
                    Alert User
                  </button>

                  <button
                    class=" button"
                    style="margin-left:80px"
                    @click="banPost"
                  >
                    Ban Post
                  </button>

                  <button
                    class="button"
                    style="margin-left:80px"
                    @click="banUser"
                  >
                    Ban User
                  </button>
                </div>

                <p>
                  <label
                    class="has-text-secondary"
                    style="margin-left:80px; cursor: pointer;"
                    @click="gotoPost(ReportItem.reportInfo.reviewId)"
                  >
                    View Post >>
                  </label>
                </p>
              </div>
            </div>
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
      ReportItem: {
        type: Object,
        required: false,
      },
    },
    computed: {
      hasData() {
        return this.ReportItem != null;
      },
      date() {
        const date = new Date(this.ReportItem.reportInfo.reportDatetime);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      time() {
        const date = new Date(this.ReportItem.reportInfo.reportDatetime);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${hour}:${minute}:${second}`;
      },
    },
    methods: {
      gotoPost(reviewId) {
        this.$router.push({ name: "Review", params: { reviewId } });
      },
      alert() {
        this.$buefy.toast.open({
          message: "Alert Reviewer Success",
          type: "is-success",
        });
      },
      banUser() {
        axios
          .post("/api/banuser", {
            userId: this.ReportItem.reportInfo.userId,
          })
          .then(() => {
            this.$store.dispatch("report/setReportList");
            this.$buefy.toast.open({
              message: "Ban Reviewer Success",
              type: "is-success",
            });
          });
      },
      banPost() {
        axios
          .post("/api/banreview", {
            reviewId: this.ReportItem.reportInfo.reviewId,
            reportId: this.ReportItem.reportInfo._id,
          })
          .then(() => {
            this.$store.dispatch("report/setReportList");
            this.$buefy.toast.open({
              message: "Ban Review Success",
              type: "is-success",
            });
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .card-container {
    width: 290;
    height: 208;
  }
  .btn-container {
    margin-top: 40%;
    display: flex;
    flex-direction: column;
  }
  .btn-container > button {
    color: $white;
    border-radius: 20px;
    background-color: $primary;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .pink-line {
    border-top: 1px solid $secondary;
  }
  .bottom-card {
    margin-top: 5%;
    color: $dark-primary;
  }
  .title-effect {
    cursor: pointer;
  }
  .title-effect:hover {
    color: $secondary;
  }
</style>
