<template lang="html">
  <button v-lav-ripple="rippleColor" :style="styles" class="lav-button" @click="handler">
    <span class="lav-button-icon" v-if="hasIcon">
      <slot name="icon"></slot>
    </span>
    <span class="lav-button-body">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import colorMixin from '../../mixins/color/index.js';
import lavRipple from '../../directives/ripple/index.js';
export default {
  directives: {
    lavRipple
  },
  mixins: [colorMixin],
  props: {
    color: {
      type: String,
      default: '#0286c2'
    },
    autocolor: {
      type: Boolean,
      default: true
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    rippleColor() {
      return (this.autocolor || this.plain) ? this.setColor(this.color) : 'rgba(255, 255, 255, .3)';
    },
    styles() {
      return this.plain ? this.plainStyles : this.normalStyles;
    },
    normalStyles() {
      return {
        backgroundColor: this.autocolor ? this.setColor(this.color) : this.color,
        color: this.autocolor ? this.color : this.chooseColor(this.color),
        fill: this.autocolor ? this.color : this.chooseColor(this.color)
      }
    },
    plainStyles() {
      return {
        color: this.color,
        fill: this.color
      }
    },
    hasIcon() {
      return typeof this.$slots.icon !== 'undefined';
    }
  },
  methods: {
    handler(e) {
      this.$emit('click', e);
      this.loading = !this.loading;
    }
  }
}
</script>
<style lang="css">

.lav-button {
  position: relative;
  border: none;
  background-color: transparent;
  outline: none;
  color: #fff;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.lav-button:hover {
  background-color: var(--button-hover-bg-color);
}
.lav-button-body {
  padding: 10px 10px;
  font-size: 14px;
  font-weight: 700;
}

.lav-button-icon {
  margin-left: 10px;
  height: 15px;
  width: 15px;
}
.lav-button-loader {
  position: absolute;
  height: 30px!important;
  width: 30px!important;
  top: 0;
  left: 0;
}
.lav-button-loader rect {
  animation: flip 1.5s infinite linear;
}
@keyframes flip {
  to {
    stroke-dashoffset: -120;
  }
}
</style>
