<template lang="html">
  <label :class="classes">
    <input type="checkbox" class="lav-checkbox-input" v-model="checked" @change="changeHandler" />
    <slot>
      <div class="lav-checkbox-indicator" :style="indicatorStyles">
        <transition :name="transitionName">
          <span v-show="checked" class="lav-checkbox-indicator-wrap" :style="indicatorWrapStyles">
            <lav-icon :size="size" name="check-mark" color="#fff"></lav-icon>
          </span>
        </transition>
      </div>
    </slot>
    {{ label }}
  </label>
</template>

<script>
import lavIcon from '../icon';
export default {
  components: { lavIcon },
  props: {
    value: Boolean,
    color: {
      type: String,
      default: '#0286c2'
    },
    name: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 20
    },
    transition: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      checked: this.value
    }
  },
  methods: {
    changeHandler(e) {
      if(!this.inGroup) {
        this.$emit('input', this.checked);
        this.$emit('change', this.checked);
      } else {
        this.$parent.$emit('child-change', this.name);
      }
    }
  },
  computed: {
    classes() {
      return [
        'lav-checkbox',
        { 'lav-checkbox-checked': this.checked }
      ]
    },
    inGroup() {
      return this.$parent.$options.name === 'lav-checkbox-group';
    },
    indicatorStyles() {
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        border: `2px solid ${this.color}`
      }
    },
    indicatorWrapStyles() {
      return {
        backgroundColor: this.color
      }
    },
    transitionName() {
      return `lav-${this.transition}`;
    }
  }
}
</script>
