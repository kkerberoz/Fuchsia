<template>
    <div>
        <div v-for="comment in comments" :key="comment._id">
            <comment-item :comment="comment" :isOwner="isOwner" :reviewId="reviewId"></comment-item>   
        </div>
        <div class="comment" v-if="hasData">
            <div class="columns">
                <div class="column is-2" style="margin: 5% 0 0 4%">
                    <div style="width: 17vh; height: 17vh;">
                        <div class="profile"></div>
                    </div>
                </div>
                <div class="column is-9">
                    <b-field 
                        style="margin: 3% 3% 0 0; font-size: 3vh; color: #c6007e;"
                    >
                        {{username}}
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
    </div>
</template>

<script>
import CommentItem from "./CommentItem";
import axios from "axios";
export default {
    components: {
        CommentItem
    },
    props: {
        userData: {
            type: Object,
            require: true
        },
        reviewId: {
            type: String,
            required: true
        },
        userId_in_review: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            commentContent: "",
            // username: "DIVE"
        }
    },
    computed: {
        hasData() {
            return this.userData != null;
        },
        username() {
            return this.userData.username;
        },
        comments() {
            return this.$store.getters["review/getCommentList"];
        },
        isOwner() {
        console.log(this.userId_in_review)
            if(this.userData != null) {
                return this.userId_in_review === this.userData._id;
            }
            return false;
        }
    },
    mounted() {
        console.log("userData",this.userData);
    },
    methods: {
        postComment() {
            const jwt_token = JSON.parse(localStorage.getItem("jwt"));
            const data = {
                reviewId: this.reviewId,
                commentContent: this.commentContent
            }
            axios.post("http://localhost:5000/api/postcomment", data, {headers: {Authorization: jwt_token}})
            .then(() => {
                this.$store.dispatch("review/setCommentList", this.reviewId);
                this.commentContent = "";
                this.$buefy.toast.open({
                    message: 'Thanks for the comment.',
                    type: 'is-success'
                });
            })
            .catch(() => {
                this.$buefy.toast.open({
                    message: 'Something went wrong.',
                    type: 'is-danger'
                });
            })
        }
    },
    watch: {
        userData() {
            console.log("userData",this.userData);
        },
        comments() {
            console.log("!!!!",this.comments);
        }
    }
}
</script>


<style lang="scss" scoped>
    .profile {
        border-radius: 50%; 
        background-image: url("../assets/profile.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: 130% 100%;
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