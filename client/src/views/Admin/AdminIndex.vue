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
    <div class="container" style="margin-top:40px">
      <div class="title">Dashboard</div>
      <div class="columns is-desktop" style="margin-top:40px">
        <div class="column">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h4>
                  Total Post:
                </h4>
                <h1 style="has-text-primary">
                  {{ totalPost }}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h4>
                  Pending Approval:
                </h4>
                <h1 style="has-text-primary; color:red">
                  {{ pendingCount }}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h4>
                  New Client in this month:
                </h4>
                <h1 style="has-text-primary">
                  {{ userLast }}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content">
              <div class="content">
                <h4>
                  Earning:
                </h4>
                <h1 style="has-text-primary">
                  1.1 K $
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="section">
        <div class="container">
          <Menubar />
          <section class="section">
            <router-view />
          </section>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import Menubar from "../../components/Menubar";
  import Loading from "vue-loading-overlay";
  import { SpringSpinner } from "epic-spinners";
  export default {
    data() {
      return {
        totalPost: 0,
        pendingCount: 0,
        userLast: 0,
        isLoading: false,
      };
    },
    components: {
      Menubar,
      Loading,
      SpringSpinner,
    },
    async mounted() {
      this.isLoading = true;
      await this.$store
        .dispatch("review/setReviewCount")
        .then(() => (this.isLoading = false));
      this.totalPost = this.$store.getters["review/getReviewCount"];

      await this.$store
        .dispatch("review/setPendingCount")
        .then(() => (this.isLoading = false));
      this.pendingCount = this.$store.getters["review/getReviewPendingCount"];

      await this.$store
        .dispatch("review/setUserCount")
        .then(() => (this.isLoading = false));
      this.userLast = this.$store.getters["review/getUserLastMonth"];
    },
  };
</script>

<style lang="scss" scoped>
  .card {
    border-radius: 10px;
  }
</style>
