<template lang="html">
  <div class="lav-radio-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'lav-radio-group',
  props: {
    value: [String, Number]
  },
  created() {
    this.$on('child-change', this.handleChildChange);
  },
  methods: {
    handleChildChange(e) {
      this.$emit('input', e);
    }
  }
}
</script>