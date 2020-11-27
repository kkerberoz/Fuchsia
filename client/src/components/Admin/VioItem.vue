<template>
  <div class="card-container" v-if="hasData">
    <div class="card" style="border-radius:20px">
      <div class="card-content">
        <p>
          <label class="title is-4">
            {{VioItem.userDetails.username}}
          </label>
          <label class="has-text-secondary" style="margin-left:80px; cursor: pointer;" @click="gotoPost(VioItem.violentContent.reviewId)">
            View Post >>
          </label>
        </p>

        <br />
        <div class="content ">
          <label class="has-text-grey">Category: </label>
          <span v-for="item in VioItem.reviewDetails.category" :key="item">
            <span>{{item}} </span>
          </span>

          <p>
            <label class="has-text-grey">Title: </label>
            {{VioItem.reviewDetails.reviewTitle}}
          </p>
          
          <label class="has-text-grey">Violence Text: </label>
          <span v-for="violentWord in VioItem.violentContent.violentContent" :key="violentWord">
            <span>{{violentWord}} </span>
          </span>
          
          <p>
            <label class="has-text-grey">Date: </label>
              {{date}}
            <label class="has-text-grey">Time: </label>
              {{time}}
          </p>
          <hr />

          <div class="columns bottom-card" style="margin-top: -20px">
            <div class="column">
              <p style="cursor: pointer;">Accept</p>
            </div>
            <div class="column">
              <p style="cursor: pointer;">Decline</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      VioItem: {
        type: Object,
        required: false,
      },
    },
    computed: {
      date() {
        const date = new Date(this.VioItem.reviewDetails.reviewDatetime);
        const day = date.getDate();
        const month = date.getMonth() +1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`; 
      },
      time() {
        const date = new Date(this.VioItem.reviewDetails.reviewDatetime);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return `${hour}:${minute}:${second}`;
      },
      hasData() {
        return this.VioItem != null;
      }
    },
    methods: {
      gotoPost(reviewId) {
        this.$router.push({name: "Review", params: {reviewId}});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .card-container {
    width: 290;
    height: 208;
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
