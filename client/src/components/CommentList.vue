<template>
    <div>
        <div class="comment">
            <div class="columns">
                <div class="column is-2" style="margin: 5% 0 0 4%">
                    <div style="width: 17vh; height: 17vh;">
                        <div class="profile"></div>
                    </div>
                </div>
                <div class="column is-9">
                    <b-field 
                        :label="username"
                        style="margin: 3% 3% 0 0;"
                    >
                        <b-input v-model="commentContent" maxlength="200" type="textarea"></b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns buttonGroup" >
                <div
                    class="column is-1 buttonControl"
                    style="margin-bottom: 3%;"
                    @click="postComment"
                >
                    submit
                </div>
            </div>
            
        </div>
        <div v-for="comment in comments" :key="comment.userId">
            <comment-item :comment="comment" ></comment-item>   
        </div>
    </div>
</template>

<script>
import CommentItem from "./CommentItem";
export default {
    components: {
        CommentItem
    },
    data() {
        return {
            commentContent: "",
            username: "DIVE"
        }
    },
    computed: {
        comments() {
            return this.$store.getters["review/getCommentList"];
        }
    },
    methods: {
        postComment() {

        }
    },
    watch: {
        comments() {
            console.log("!!!!",this.comments);
        }
    }
}
</script>


<style lang="scss" scoped>
    .profile {
        border-radius: 50%; 
        background-image: url(../assets/profile.png);
        width: 70%; 
        height: 70%;
    }
    .comment {
        background-color: white;
        border-radius: 20px;
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
        margin-right: 5%;
    }
</style>