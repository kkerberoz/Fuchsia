<template>
    <div class="container is-fullhd" v-if="hasReview">
        <div v-for="review in 10" :key="review" class="horizontal-container">
            <review-item :review="review"></review-item>
        </div>
    </div>
</template>

<script>
import ReviewList from "./ReviewItem";
export default {
    components: {
        'review-item': ReviewList
    },
    computed: {
        hasReview() {
            return true;
        }
    }
}
</script>

<style scoped>
    .horizontal-container {
        display: flex;
        overflow-x:auto;
    }
</style>