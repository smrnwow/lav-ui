<template lang="html">
  <div class="lav-tab" @click="handle">
    <slot></slot>
  </div>
</template>

<script>
import bus from '../../helpers/bus.js';
export default {
  methods: {
    handle() {
      this.$nextTick(() => {
        let offset = {
          left: this.$parent.$el.getBoundingClientRect().left,
          top: this.$parent.$el.getBoundingClientRect().top
        }
        let data = {
          width: this.$el.getBoundingClientRect().width + 'px',
          left: (this.$el.getBoundingClientRect().left - offset.left) + 'px',
          height: this.$el.getBoundingClientRect().height + 'px',
          top: (this.$el.getBoundingClientRect().top - offset.top) + 'px'
        };
        bus.$emit('lav-tab-change', { data })
      })
    }
  }
}
</script>

<style lang="css">
</style>