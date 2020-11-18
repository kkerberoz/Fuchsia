<template>
  <div class="card-container">
    <div class="card">

      <div v-if="hasImage" @click="goToReview" class="card-image" style="cursor: pointer;">
        <figure class="image is-4by3">
          <img
            :src="reviewItem.imageLink"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <p @click="goToReview(reviewItem._id)" class="title is-4 title-effect" >{{reviewItem.reviewTitle}}</p>
        <hr class="pink-line">
        <div class="content">
          {{reviewItem.reviewDescription}}
          <br/>
          <div class="columns bottom-card">
              <div class="column">
                <span 
                    v-for="category in reviewItem.category" 
                    :key="category"
                    style="margin-right: 2%;"
                >
                    {{category}}
                </span>
              </div>
              <div class="column">
                  <time datetime="2016-1-1">{{reviewItem.reviewDateTime}}</time>
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
    reviewItem: {
      type: Object,
      required: true
    }
  },
    computed: {
      hasImage() {
        return this.reviewItem.imageLink !== "";
      }
    },
    methods: {
      goToReview(reviewId) {
        this.$router.push({name: "Review", params: {reviewId}});
      }
    }
}
</script>

<style lang="scss" scoped>
.card-container {
  margin-top: 3%;
  width: 360px;
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
