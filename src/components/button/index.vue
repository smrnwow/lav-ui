<template lang="html">
  <button :class="buttonClasses" :style="styles" @mousedown="getActive" @mouseup="getInactive" @click="clickHandler">
    <span class="lav-button-icon" v-if="hasIcon">
      <lav-icon :name="icon" :color="iconColor"></lav-icon>
    </span>
    <span v-if="$slots.default && $slots.default.length" :class="bodyClasses">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import Color from 'color';

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
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      active: false,
      styles: {}
    }
  },
  created() {
    this.setStyles();
  },
  computed: {
    buttonClasses() {
      return [
        'lav-button',
        { 'lav-button-rounded': this.rounded }
      ]
    },
    bodyClasses() {
      return [
        'lav-button-body',
        { 'lav-button-body-with-icon': this.icon }
      ]
    },
    iconColor() {
      if(this.plain) {
        return this.color;
      } else if(this.autocolor) {
        return this.color;
      } else {
        return this.setColorByContrast(this.color);
      }
    },
    hasIcon() {
      return this.icon !== '';
    }
  },
  methods: {
    setStyles() {
      if(this.autocolor && !this.plain && !this.disabled) {
        this.setNormalStyles();
      } else if(this.autocolor && this.plain) {
        this.setPlainStyles();
      } else if(!this.autocolor) {
        this.setNotAutocolorStyles();
      } else if(this.disabled) {
        this.setDisabledStyles();
      }
    },
    setNormalStyles() {
      this.setStyle('backgroundColor', this.setColorTransparent(this.color, 0.3));
      this.setStyle('color', this.color);
      this.setStyle('boxShadow', `0 7px 14px ${this.setColorTransparent(this.color, 0.3)}, 0 3px 6px ${this.setColorTransparent(this.color, 0.3)}`);
    },
    setPlainStyles() {
      this.setStyle('color', this.color);
      this.setStyle('backgroundColor', '#fff');
      this.setStyle('boxShadow', '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)');
    },
    setNotAutocolorStyles() {
      this.setStyle('backgroundColor', this.setColorTransparent(this.color, 0.3));
      this.setStyle('color', this.setColorByContrast(this.color));
      this.setStyle('boxShadow', `0 7px 14px ${this.setColorTransparent(this.color, 0.3)}, 0 3px 6px ${this.setColorTransparent(this.color, 0.3)}`);
    },
    setActiveStyles() {
      this.setStyle('backgroundColor', this.setColorTransparent(this.color, 0.4));
      this.setStyle('boxShadow', `0 6px 12px ${this.setColorTransparent(this.color, 0.4)}, 0 6px 12px ${this.setColorTransparent(this.color, 0.4)}`);
    },
    setDisabledStyles() {
      this.setStyle('backgroundColor', this.setGray(this.color));
    },
    getActive() {
      this.setActiveStyles();
    },
    getInactive() {
      this.setStyles();
    },
    setStyle(property, value) {
      this.$set(this.styles, property, value);
    },
    clickHandler(e) {
      this.$emit('click', e);
      this.loading = !this.loading;
    }
  },
  watch: {
    color(n) {
      this.setStyles();
    }
  }
}
</script>
