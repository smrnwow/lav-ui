<template lang="html">
  <div :class="classes" @click="clickHandler" @focus="clickHandler" tabindex
    @mouseenter="hoverHandler" @mouseleave="hoverHandler">
    <div class="tab-label">
      <slot name="label"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data() {
    return {
      hovered: false
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    isCurrent() {
      return this.$parent.current === this.name;
    },
    classes() {
      return [
        'tab',
        { 'tab-current': this.isCurrent },
        { 'tab-horizontal': this.$parent.direction === 'horizontal' },
        { 'tab-vertical': this.$parent.direction === 'vertical' },
        { 'tab-hovered-horizontal': this.hovered && this.$parent.direction === 'horizontal' },
        { 'tab-hovered-vertical': this.hovered && this.$parent.direction === 'vertical' }
      ]
    }
  },
  methods: {
    hoverHandler(e) {
      this.hovered = !this.hovered;
    },
    clickHandler(e) {
      this.$parent.$emit('change-tab', { current: this.name });
    }
  }
}
</script>