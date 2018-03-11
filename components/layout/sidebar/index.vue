<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  
}
</script>
<style scoped>
.sidebar {
  position: fixed;
  width: 15%;
  height: 100%;
  overflow-y: auto;
  padding: 10px;
}
</style>
