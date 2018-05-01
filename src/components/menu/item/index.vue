<template lang="html">
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return [
        'lav-menu-item',
        { 'lav-menu-item-title': this.title }
      ]
    }
  }
}
</script>

<style lang="css">
.lav-menu-item-title {
  user-select: none;
  padding: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 18px;
}
</style>
