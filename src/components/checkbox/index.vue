<template lang="html">
  <label class="lav-checkbox" :class="{ 'control_checked': checked }">
    <input type="checkbox" class="lav-checkbox-input" v-model="checked" @change="handleChange" />
    <slot>
      <div class="lav-checkbox-indicator" :style="indicatorStyles">
        <transition :name="transitionName">
          <span v-show="checked" class="lav-checkbox-indicator-wrap">
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
      if(!this.inGroup) {
        this.$emit('input', this.checked);
        this.$emit('change', this.checked);
      } else {
        this.$parent.$emit('child-change', this.name);
      }
    }
  },
  computed: {
    inGroup() {
      return this.$parent.$options.name === 'lav-checkbox-group';
    },
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
