<template>
    <div>
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
    computed: {
        comments() {
            return this.$store.getters["review/getCommentList"];
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

</style>