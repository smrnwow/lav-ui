<template lang="html">
  <transition name="tag">
    <span v-if="visible" @click="clickHandler" class="lav-tag" :style="styles">
      <span class="lav-tag-body">
        {{ label }}
      </span>
      <span v-if="deletable" class="lav-tag-close" @click.stop="deleteTag">
        <svg :style="iconStyles" class="lav-icon" x="0px" y="0px" viewBox="0 0 21.9 21.9">
          <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
          c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
        </svg>
      </span>
    </span>
  </transition>
</template>

<script>
import colorMixin from '../../mixins/color/index.js';
export default {
  mixins: [colorMixin],
  props: {
    label: String,
    color: {
      type: String,
      default: 'rgb(2, 146, 234)'
    },
    deletable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.show();
  },
  methods: {
    clickHandler(e) {
      this.$emit('click', e);
    },
    deleteTag() {
      this.$emit('delete');
      this.hide();
    },
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  },
  computed: {
    styles() {
      return {
        backgroundColor: this.setColor(this.color),
        color: this.color,
        border: `1px solid ${this.color}`
      }
    },
    iconStyles() {
      return {
        fill: this.color
      }
    }
  }
}
</script>