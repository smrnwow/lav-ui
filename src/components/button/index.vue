<template lang="html">
  <button v-lav-ripple="rippleColor" :style="styles" class="lav-button" @click="handler">
    <span class="lav-button-icon" v-if="hasIcon">
      <lav-icon :name="icon" :color="iconColor"></lav-icon>
    </span>
    <span class="lav-button-body">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import lavIcon from '../icon';
import colorMixin from '../../mixins/color/index.js';
import lavRipple from '../../directives/ripple/index.js';
export default {
  components: { lavIcon },
  directives: {
    lavRipple
  },
  mixins: [colorMixin],
  props: {
    icon: {
     type: String,
     default: ''
    },
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
        boxShadow: `0 7px 14px ${this.setColor(this.color)}, 0 3px 6px ${this.setColor(this.color)}`
      }
    },
    plainStyles() {
      return {
        color: this.color,
        boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)'
      }
    },
    iconColor() {
      if(this.plain) {
        return this.color;
      } else if(this.autocolor) {
        return this.color;
      } else {
        return this.chooseColor(this.color);
      }
    },
    hasIcon() {
      return this.icon !== '';
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