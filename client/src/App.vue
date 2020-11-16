<template>
  <div id="app">
    <component :is="this.$route.meta.layout || 'div'">
      <router-view />
    </component>
  </div>
</template>
<script>
  export default {};
</script>

<style lang="scss">
  #app {
    font-family: $kanit-font;
  }
</style>
