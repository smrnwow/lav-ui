<template lang="html">
  <div :class="classes" @click="clickHandler">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'lav-dropdown-menu-item',
  props: {
    title: {
      type: Boolean,
      default: false
    },
    name: String
  },
  computed: {
    classes() {
      return [
        'lav-dropdown-menu-item',
        { 'lav-dropdown-menu-item-title': this.title }
      ]
    }
  },
  methods: {
    clickHandler() {
      console.log(this.name);
      this.$emit('click', this.name);
    }
  }
}
</script>

<style lang="css">
.lav-dropdown-menu-item {
  padding: 10px;
  transition: .1s ease-in-out;
}
.lav-dropdown-menu-item:hover {
  background-color: rgba(0,0,0,.1);
}
</style>
