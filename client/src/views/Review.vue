<template>
  <div class="container" id="postBlog">
    <div class="container">
      <div class="columns">
        <div class="column">Hellooo</div>
        <div class="column">Worlldddd</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      reviewId: {
        type: String,
        required: true,
      },
    },
    mounted() {
      console.log(this.reviewId);
    },
  };
</script>

<style lang="scss" scoped>
  #postBlog {
    margin-top: 5%;
    padding: 20px;
    background-image: url(../assets/svg/postBlog.svg);
    background-size: cover;
    height: 100rem;
  }
</style>
