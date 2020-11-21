<template>
  <div class="comment" >
    <div class="columns">
      <div class="column is-2" style="margin: 5% 0 0 4%">
        <div style="width: 17vh; height: 17vh;">
          <div class="profile"></div>
        </div>
      </div>
      <div class="column is-9" style="top: 50%;">
        {{comment.commentContent}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("this is comment data",this.comment);
  }
};
</script>

<style lang="scss">
.comment {
  margin-top: 2%;
  background-color: white;
  border-radius: 20px;
}
</style>
