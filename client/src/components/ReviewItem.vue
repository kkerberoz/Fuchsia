<template>
  <div class="card-container">
    <div class="card">

      <div v-if="hasImage" class="card-image">
        <figure class="image is-4by3">
          <img
            :src="reviewItem.imageLink"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <p class="title is-4">{{reviewItem.reviewTitle}}</p>
        <hr class="pink-line">
        <div class="content">
          {{reviewItem.reviewContent}}
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
    computed: {
        hasImage() {
            return true;
        },
        reviewItem() {
            return {
                reviewTitle: "this is title",
                reviewContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus neciaculis mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus neciaculis mauris.",
                imageLink: "https://bulma.io/images/placeholders/1280x960.png",
                reviewDateTime: "11:09 PM - 1 Jan 2016",
                category: ["travel", "camera"]
            }
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
</style>
