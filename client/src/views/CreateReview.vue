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
          <div v-if="isSelectCategoryState"></div>
          <div v-if="isCreateReviewState">
            <div class="editor">
              <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
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
                </div>
              </editor-menu-bar>

              <editor-content class="editor__content" :editor="editor" />
            </div>
          </div>
          <div v-if="isPreviewState">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and
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
    <comment-list></comment-list>
  </div>
</template>

<script>
  // import ReviewContent from "../components/ReviewContent";
  import Icon from "../components/Icon";
  import CommentList from "../components/CommentList";
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
  } from "tiptap-extensions";

  export default {
    components: {
      // ReviewContent,
      CommentList,
      EditorContent,
      EditorMenuBar,
      Icon,
    },
    props: {
      reviewId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        tabStage: 1,
        html: "",
        content: "",

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
          ],
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
        } else {
          this.tabStage += 1;
          console.log(this.content);
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
