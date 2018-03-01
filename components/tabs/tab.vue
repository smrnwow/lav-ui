<template lang="html">
  <div class="tab" @click="handle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    index: [String, Number]
  },
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
        this.$parent.$emit('change-tab', { data, index: this.index })
      })
    }
  }
}
</script>

<style lang="css">
</style>