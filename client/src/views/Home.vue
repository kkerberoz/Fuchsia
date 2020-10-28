<template>
  <section class="hero-body is-fullheight">
    <div class="container">
      <review-list></review-list>
    </div>
  </section>
</template>

<script>
import ReviewList from "../components/ReviewList";
  export default {
    name: "Home",
    components: {
      'review-list': ReviewList
    }
  };
</script>
