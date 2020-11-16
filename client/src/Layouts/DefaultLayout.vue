<template>
  <div class="Site">
    <Navbar />

    <div class="Site-content">
      <router-view />
    </div>

    <Footer />
  </div>
</template>
<script>
  import Navbar from "../components/Navbar";
  import Footer from "../components/Footer";
  export default {
    components: { Navbar, Footer },
  };
</script>

<style lang="scss">
  .Site {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .Site-content {
    flex: 1;
  }
</style>
