<template>
  <div class="Site" id="admin">
    <Sidebar />
    <div class="Site-content">
      <router-view />
    </div>
  </div>
</template>
<script>
  import Sidebar from "../components/Sidebar";
  export default {
    components: { Sidebar },
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
