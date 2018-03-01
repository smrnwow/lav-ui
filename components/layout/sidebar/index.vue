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
    flex-grow: 1;
    overflow-y: auto;
    /* width: 20%; */
    padding: 10px;
}
</style>
