<template lang="html">
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'lav-radio-group',
  props: {
    value: [String, Number],
    button: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#0286c2'
    }
  },
  data() {
    return {
      active: this.value
    }
  },
  created() {
    this.$on('change', this.handleChildChange);
  },
  methods: {
    handleChildChange(e) {
      this.active = e;
      this.$emit('input', this.active);
    }
  },
  computed: {
    styles() {
      return {
        border: this.button ? `2px solid ${this.color}` : 'none'
      }
    },
    classes() {
      return [
        'lav-radio-group',
        { 'lav-radio-group--button': this.button }
      ]
    }
  }
}
</script>
<style media="screen">
.lav-radio-group--button {
  display: flex;
  border-radius: 15px;
  width: fit-content;
  overflow: hidden;
}
.lav-radio-group--button .lav-radio {
  padding: 5px 15px;
}
.lav-radio-group--button .lav-radio-checked {
  background-color: rgba(0,0,0,.4);
  color: #fff;
}
</style>
