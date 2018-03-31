<template lang="html">
  <div :class="classes" @click="handleClick">
    <div class="tab-label">
      <slot name="label"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
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
        { 'tab-current': this.isCurrent }
      ]
    }
  },
  methods: {
    handleClick(e) {
      this.$parent.$emit('change-tab', { current: this.name });
    }
  }
}
</script>