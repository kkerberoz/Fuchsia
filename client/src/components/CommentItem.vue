<template>
    <div class="comment">
        {{comment}}
    </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="scss">
    .comment {
        margin-top: 2%;
        background-color: white;
        border-radius: 20px;
    }

</style>