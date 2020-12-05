<template>
  <div>
    <nav class="bd-tabs">
      <div class="tabs">
        <ul>
          <li>
            <router-link :to="{ name: 'ContentVio' }">
              Content
            </router-link>
          </li>
          <li>
            <a>
              User
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  .bd-tabs {
    margin-bottom: 3rem;
  }
  .tabs {
    -webkit-overflow-scrolling: touch;
    align-items: stretch;
    display: flex;
    font-size: 1rem;
    justify-content: space-between;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
  }
</style>
