<template>
  <div>
    <div id="tabGroup" class="columns">
      <div
        id="categoryTab"
        @click="selectCategory"
        class="column is-one-fifth tabStage"
      >
        <h1>Category select</h1>
      </div>
      <div
        id="createReviewTab"
        @click="createReview"
        class="column is-one-fifth tabStage"
      >
        <h1>Create review</h1>
      </div>
      <div
        id="previewTab"
        @click="preview"
        class="column is-one-fifth tabStage"
      >
        <h1>Preview</h1>
      </div>
    </div>
    <div id="postBlog" class="container">
      <div class="columns">
        <div id="reviewContent" class="column">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </div>
      </div>
      <!-- Button firld -->
      <div>
        <div class="columns buttonGroup">
          <div v-if="!isFirstStep" class="column is-1 buttonControl" @click="back">
            Back
          </div>
          <div class="column is-1 buttonControl" @click="next">
            {{goButton}}
          </div>
        </div>
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
  data() {
    return {
      tabStage: 1,
    };
  },
  computed: {
    goButton() {
        return this.tabStage === 3 ? "Submit" : "Next";
    },
    isFirstStep() {
        return this.tabStage === 1;
    }
  },
  methods: {
    selectCategory() {
      this.tabStage = 1;
    },
    createReview() {
      this.tabStage = 2;
    },
    preview() {
      this.tabStage = 3;
    },
    next() {
        if(this.tabStage === 3) {
            //Go post
        }
        else {
            this.tabStage += 1;
            //next step
        }
    },
    back() {
        this.tabStage -= 1;
    },
  },
  mounted() {
    console.log(this.reviewId);
  },
  watch: {
    tabStage() {
      if (this.tabStage === 1) {
        document.getElementById("categoryTab").style.backgroundColor =
          "#c6007e";
        document.getElementById("createReviewTab").style.backgroundColor =
          "#f277c6";
        document.getElementById("previewTab").style.backgroundColor = "#f277c6";
      } else if (this.tabStage === 2) {
        document.getElementById("categoryTab").style.backgroundColor =
          "#f277c6";
        document.getElementById("createReviewTab").style.backgroundColor =
          "#c6007e";
        document.getElementById("previewTab").style.backgroundColor = "#f277c6";
      } else {
        document.getElementById("categoryTab").style.backgroundColor =
          "#f277c6";
        document.getElementById("createReviewTab").style.backgroundColor =
          "#f277c6";
        document.getElementById("previewTab").style.backgroundColor = "#c6007e";
      }
    },
  },
};
</script>

<style lang="scss" scoped>

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

    #tabGroup {
        margin-bottom: 0;
        margin-left: 5%;
    }

    #categoryTab {
        background-color: $primary;
    }

    .tabStage {
        text-align: center;
        color: white;
        margin-top: 5%;
        border-color: white;
        height: 5vh;
        margin-left: -5%;
        border-top-left-radius: 50px;
        border-top-right-radius: 30px;
        background-color: $secondary;
        cursor: pointer;
    }

    #postBlog {
        padding: 40px;
        background-image: url("../assets/svg/postBlog.svg#svgView(preserveAspectRatio(none))");
        background-size: cover;
        width: 100%;
        height: auto;
    }

    @media screen and (max-width: 1024px) {
        #postBlog {
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
