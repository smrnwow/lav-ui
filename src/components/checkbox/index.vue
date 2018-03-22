<template lang="html">
  <label class="lav-checkbox">
    <input type="checkbox" class="lav-checkbox-input" v-model="checked" @change="handleChange" />
    <div class="lav-checkbox-indicator" :style="indicatorStyles">
      <transition :name="transitionName">
        <span v-show="checked" class="lav-checkbox-indicator-wrap">
          <lav-icon :height="size" :width="size" icon-name="check-mark" color="#fff"></lav-icon>
        </span>
      </transition>
    </div>
    <slot></slot>
  </label>
</template>

<script>
import lavIcon from '../icon';
export default {
  components: { lavIcon },
  props: {
    value: Boolean,
    size: {
      type: Number,
      default: 20
    },
    transition: {
      type: String,
      default: 'scale'
    }
  },
  data() {
    return {
      checked: this.value
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', this.checked);
    }
  },
  computed: {
    indicatorStyles() {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      }
    },
    transitionName() {
      return `lav-${this.transition}`;
    }
  }
}
</script>