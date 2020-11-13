<template>
  <div class="container">
    <div id="postBlog" class="container">
      <div class="columns">
        <div id="reviewContent" class="column">
          {{content}}
          <!-- content -->
        </div>
      </div>
        <hr class="pink-line">
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
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and"
      }
    },
    mounted() {
      console.log(this.reviewId);
    },
  };
</script>

<style lang="scss" scoped>

  .pink-line {
      border-top: 1px solid $secondary;
      margin: 3%;
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
