<template>
  <div class="card-container" v-if="hasData">
    <div class="card" style="border-radius:20px">
      <div class="card-content">
        <p>
          <label class="title is-4">
            Helloooo
          </label>
          <label class="has-text-secondary" style="margin-left:80px">
            View Post >>
          </label>
        </p>

        <br />
        <div class="content ">
          <p>
            <label class="has-text-grey">Category: </label>
            Food
          </p>
          <p>
            <label class="has-text-grey">Title: </label>
            Padthai
          </p>
          <p>
            <label class="has-text-grey">Violence Text: </label>
            FUCK!
          </p>
          <p>
            <label class="has-text-grey">Date: </label>
            3030
            <label class="has-text-grey">Time: </label>
            20202
          </p>
          <hr />

          <div class="columns bottom-card" style="margin-top: -20px">
            <div class="column">
              Accept
            </div>
            <div class="column">
              Decline
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
      ReportItem: {
        type: Object,
        required: false,
      },
    },
    computed: {
      hasData() {
        return this.ReportItem != null;
      },
    },
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
