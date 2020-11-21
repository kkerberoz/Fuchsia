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
            <div v-if="isSelectCategoryState">
              <div class="columns">
                <div class="column is-3">
                  <label class="checkbox">
                    <input v-model="Camera" value="Camera" type="checkbox" />
                    Camera
                  </label>
                </div>
                <div class="column is-3">
                  <label class="checkbox">
                    <input v-model="Natural" type="checkbox" />
                    Natural
                  </label>
                </div>
                <div class="column is-3">
                  <label class="checkbox">
                    <input v-model="Shopping" type="checkbox" />
                    Shopping
                  </label>
                </div>
                <div class="column is-3">
                  <label class="checkbox">
                    <input v-model="Food" type="checkbox" />
                    Food
                  </label>
                </div>
              </div>
              <div class="columns">
                <div class="column is-3">
                  <label class="checkbox">
                    <input v-model="Drink" type="checkbox" />
                    Drink
                  </label>
                </div>
                <div class="column is-3">
                  <label class="checkbox">
                    <input v-model="Restaurant" type="checkbox" />
                    Restaurant
                  </label>
                </div>
                <div class="column is-3">
                  <label class="checkbox">
                    <input v-model="Sports" type="checkbox" />
                    Sports
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div v-if="isCreateReviewState">
            <div>
              <label class="title">Title:</label>
              <input
                v-model="reviewTitle"
                type="text"
                class="input"
                style="margin-top:10px"
              />
            </div>
            <div>
              <label class="title">Description:</label>
              <input
                v-model="reviewDescription"
                type="text"
                class="input"
                style="margin-top:10px"
              />
            </div>
            <div class="editor">
              <label class="title" style="margin-top:10px"> Content: </label>
              <editor-menu-bar
                :editor="editor"
                v-slot="{ commands, isActive }"
                style="margin-top:10px"
              >
                <div class="menubar">
                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                  >
                    <icon name="bold" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                  >
                    <icon name="italic" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                  >
                    <icon name="strike" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                  >
                    <icon name="underline" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                  >
                    <icon name="code" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.paragraph() }"
                    @click="commands.paragraph"
                  >
                    <icon name="paragraph" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 1 })"
                  >
                    H1
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                  >
                    H2
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                  >
                    H3
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                  >
                    <icon name="ul" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                  >
                    <icon name="ol" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                  >
                    <icon name="quote" />
                  </button>

                  <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                  >
                    <icon name="code" />
                  </button>

                  <button
                    class="menubar__button"
                    @click="commands.horizontal_rule"
                  >
                    <icon name="hr" />
                  </button>

                  <button class="menubar__button" @click="commands.undo">
                    <icon name="undo" />
                  </button>

                  <button class="menubar__button" @click="commands.redo">
                    <icon name="redo" />
                  </button>

                  <button
                    class="menubar__button"
                    @click="showImagePrompt(commands.image)"
                  >
                    <icon name="image" />
                  </button>
                </div>
              </editor-menu-bar>
              <editor-content
                class="editor__content"
                :editor="editor"
                style="margin-top:20px"
              />
            </div>
          </div>
          <div v-if="isPreviewState">
            <!-- <div style="color: #c6007e; font-size: 20 px;">Title: <p style="color: black;">{{reviewTitle}}</p></div>
            <div style="margin-top:2%; color: #c6007e; font-size: 20 px;">Description:  <p style="color: black;">{{reviewDescription}}</p></div>
            <div style="margin-top:2%; color: #c6007e; font-size: 20 px;">Content:  <p style="color: black;">{{reviewDescription}}</p></div> -->
            <div v-html="html"></div>
            <!-- Content preview is here -->
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
  // import ReviewContent from "../components/ReviewContent";
  import Icon from "../components/Icon";
  import { Editor, EditorContent, EditorMenuBar } from "tiptap";
  import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    Image,
  } from "tiptap-extensions";

  export default {
    name: "CreateReview",
    components: {
      // ReviewContent,
      EditorContent,
      EditorMenuBar,
      Icon,
    },
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
        html: "",
        content: "",
        reviewTitle: "",
        reviewDescription: "",
        imageLink: "",

        editor: new Editor({
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new HorizontalRule(),
            new ListItem(),
            new OrderedList(),
            new TodoItem(),
            new TodoList(),
            new Link(),
            new Bold(),
            new Code(),
            new Italic(),
            new Strike(),
            new Underline(),
            new History(),
            new Image(),
          ],
          content: `<p></p>
          <p></p>
          <p></p>
          <p></p>`,
          onUpdate: ({ getHTML }) => {
            this.html = getHTML();
            if (this.html === "<p></p>") this.content = "";
            else this.content = this.html;
          },
        }),
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

 beforeDestroy() {
      this.editor.destroy();
    },
    methods: {
      showImagePrompt(command) {
        const src = prompt("Enter the url of your image here");
        if (src !== null) {
          command({ src });
          if (this.imageLink === " ") {
            this.imageLink = src;
          }
        }
      },
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
          const data = {
            reviewTitle: this.reviewTitle,
            reviewContent: `${this.html}`,
            reviewDescription: this.reviewDescription,
            category: this.category,
            imageLink: this.imageLink,
            view: 0,
          };
          this.$store.dispatch("review/postReview", data).then( (reviewId) => {
            console.log("reviewID",reviewId)
            if(reviewId) {
              this.$swal({
                  title: "POST CREATED!", 
                  text: "Click the button to continue.", 
                  icon: "success",
                  confirmButtonColor: " #c6007e"
              }).then(() => this.$router.push({name: "Review", params: {reviewId}}));
            }
          });
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
        this.Camera
          ? this.category.push("Camera")
          : this.category.splice(this.category.indexOf("Camera"), 1);
      },
      Natural() {
        this.Natural
          ? this.category.push("Natural")
          : this.category.splice(this.category.indexOf("Natural"), 1);
      },
      Shopping() {
        this.Shopping
          ? this.category.push("Shopping")
          : this.category.splice(this.category.indexOf("Shopping"), 1);
      },
      Food() {
        this.Food
          ? this.category.push("Food")
          : this.category.splice(this.category.indexOf("Food"), 1);
      },
      Drink() {
        this.Drink
          ? this.category.push("Drink")
          : this.category.splice(this.category.indexOf("Drink"), 1);
      },
      Restaurant() {
        this.Restaurant
          ? this.category.push("Restaurant")
          : this.category.splice(this.category.indexOf("Restaurant"), 1);
      },
      Sports() {
        this.Sports
          ? this.category.push("Sports")
          : this.category.splice(this.category.indexOf("Sports"), 1);
      },
      tabStage() {
        if (this.tabStage === 1) {
          document.getElementById("categoryTab").style.backgroundColor =
            "#c6007e";
          document.getElementById("createReviewTab").style.backgroundColor =
            "#f277c6";
          document.getElementById("previewTab").style.backgroundColor =
            "#f277c6";
        } else if (this.tabStage === 2) {
          document.getElementById("categoryTab").style.backgroundColor =
            "#f277c6";
          document.getElementById("createReviewTab").style.backgroundColor =
            "#c6007e";
          document.getElementById("previewTab").style.backgroundColor =
            "#f277c6";
        } else {
          document.getElementById("categoryTab").style.backgroundColor =
            "#f277c6";
          document.getElementById("createReviewTab").style.backgroundColor =
            "#f277c6";
          document.getElementById("previewTab").style.backgroundColor =
            "#c6007e";
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .ProseMirror {
    min-height: 20vh;
  }
  .editor__content {
    border: 1px solid $black;
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
  .menubar__button {
    background: none;
    border: none;
  }
</style>
