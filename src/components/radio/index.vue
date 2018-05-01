<template lang="html">
  <label :class="classes" :style="styles">
    <input :value="checked" type="radio" class="lav-radio-input" @change="changeHandler" />
    <slot>
      <div class="lav-radio-indicator" :style="indicatorStyles">
        <transition :name="transitionName">
          <span v-show="active" class="lav-radio-indicator-wrap" :style="indicatorWrapStyles"></span>
        </transition>
      </div>
    </slot>
    <span v-if="label" class="lav-radio-label">
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: 20
    },
    transition: {
      type: String,
      default: 'scale'
    },
    color: {
      type: String,
      default: '#0286c2'
    }
  },
  data() {
    return {
      checked: false
    }
  },
  methods: {
    changeHandler(e) {
      let value = this.value ? this.value : this.label;
      this.checked = true;
      this.$parent.$emit('change', value);
    }
  },
  computed: {
    active() {
      if(this.label !== '') {
        return this.label === this.$parent.active;
      } else if(this.value !== '') {
        return this.value === this.$parent.active;
      } else {
        return false;
      }
    },
    classes() {
      return [
        'lav-radio',
        { 'lav-radio-checked': this.active }
      ]
    },
    styles() {
      return {
        backgroundColor: (this.isButton && this.active) ? this.color : 'transparent'
      }
    },
    isButton() {
      return this.$parent.button;
    },
    inGroup() {
      return this.$parent.$options.name === 'lav-radio-group';
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
  },
  watch: {
    '$parent.active': function(n) {
      console.log(n, 'do');
      if(n !== this.label || n !== this.value) {
        this.checked = false;
      }
    }
  }
}
</script>
<style>
.lav-radio {
  position: relative;
  display: flex;
  cursor: pointer;
  padding: 10px;
  margin: 0;
}
.lav-radio-group {
  display: flex;
}
.lav-radio-input {
  display: none;
}
.lav-radio-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: transparent;
  border-radius: 50%;
}
.lav-radio-indicator-wrap {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  transform: scale(1.4);
}
.lav-radio-label {
  margin-left: 5px;
}
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: .2s;
}
.fade-scale-enter, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
