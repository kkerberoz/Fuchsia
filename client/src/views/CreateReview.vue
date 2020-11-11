<template>
  <div class="container">
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
          <div v-if="isSelectCategoryState">
            <div class="columns">
              <div class="column is-3">
                <label class="checkbox">
                <input v-model="Camera" value="Camera" type="checkbox">
                Camera
              </label>
              </div>
              <div class="column is-3">
                <label class="checkbox">
                  <input v-model="Natural" type="checkbox">
                  Natural
                </label>
              </div>
              <div class="column is-3">
                <label class="checkbox">
                  <input v-model="Shopping" type="checkbox">
                  Shopping
                </label>
              </div>
              <div class="column is-3">
                <label class="checkbox">
                    <input v-model="Food" type="checkbox">
                    Food
                </label>
              </div>
            </div>
            <div class="columns">
              <div class="column is-3">
                <label class="checkbox">
                    <input v-model="Drink" type="checkbox">
                    Drink
                </label>
              </div>
              <div class="column is-3">
                <label class="checkbox">
                  <input v-model="Restaurant" type="checkbox">
                  Restaurant
                </label>
              </div>
              <div class="column is-3">
                <label class="checkbox">
                  <input v-model="Sports" type="checkbox">
                  Sports
                </label>
              </div>
            </div>
          </div>
          <div v-if="isCreateReviewState">
            
          </div>
          <div v-if="isPreviewState">
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
      </div>
      <!-- Button firld -->
      <div>
        <div class="columns buttonGroup">
          <div
            v-if="!isFirstStep"
            class="column is-1 buttonControl"
            @click="back"
          >
            Back
          </div>
          <div class="column is-1 buttonControl" @click="next">
            {{ goButton }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: {
  //   reviewId: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      tabStage: 1,
      category: [],
      Camera: false,
      Natural: false,
      Shopping: false,
      Food: false,
      Drink: false,
      Restaurant: false,
      Sports: false,
    };
  },
  computed: {
    isSelectCategoryState() {
      return this.tabStage === 1;
    },
    isCreateReviewState() {
      return this.tabStage === 2;
    },
    isPreviewState() {
      return this.tabStage === 3;
    },
    goButton() {
      return this.tabStage === 3 ? "Submit" : "Next";
    },
    isFirstStep() {
      return this.tabStage === 1;
    },
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
      if (this.tabStage === 3) {
        //Go post
        const testObj = {
          userId: "12345",
          reviewTitle: "test1sd",
          reviewContent: "this is content",
          reviewDatetime: "wednesday",
          category: "Sport",
          status: "Ban",
          imageLink: "https://test.png",
          view: 0
        }
        this.$store.dispatch("review/postReview", testObj);
      } else {
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
    Camera() {
      this.Camera ? this.category.push("Camera") : this.category.splice(this.category.indexOf("Camera"),1);
    },
    Natural() {
      this.Natural ? this.category.push("Natural") : this.category.splice(this.category.indexOf("Natural"),1);
    },
    Shopping() {
      this.Shopping ? this.category.push("Shopping") : this.category.splice(this.category.indexOf("Shopping"),1);
    },
    Food() {
      this.Food ? this.category.push("Food") : this.category.splice(this.category.indexOf("Food"),1);
    },
    Drink() {
      this.Drink ? this.category.push("Drink") : this.category.splice(this.category.indexOf("Drink"),1);
    },
    Restaurant() {
      this.Restaurant ? this.category.push("Restaurant") : this.category.splice(this.category.indexOf("Restaurant"),1);
    },
    Sports() {
      this.Sports ? this.category.push("Sports") : this.category.splice(this.category.indexOf("Sports"),1);
    },
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
  height: 6vh;
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
