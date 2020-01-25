<template>
  <div class="layout">
    <slot/>
  </div>
</template>
<script>
  export default {
    name: "comments-layout",
  }
</script>
<style scoped lang="scss">
  .layout {
    margin: 20px auto;
    max-width: 600px;
  }
</style>