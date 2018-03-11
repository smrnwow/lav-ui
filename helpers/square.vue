<template>
  <div class="lav-square" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    indicator: {
      type: String,
      default: 'height'
    }
  },
  data() {
    return {
      size: 0
    }
  },
  mounted() {
    this.rerender();
    window.addEventListener('resize', this.rerender);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.rerender);
  },
  methods: {
    rerender() {
      this.$nextTick(() => {
        this.size = this.$parent.$el.getBoundingClientRect()[this.indicator] + 'px';
      });
    }
  },
  computed: {
    styles() {
      return {
        width: this.size,
        height: this.size,
        padding: '0 5px',
        display: 'inline-block'
      }
    }
  }
}
</script>