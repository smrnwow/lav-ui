<template lang="html">
  <label :class="classes">
    <input type="radio" class="lav-radio-input" v-model="val" @change="changeHandler" />
    <slot>
      <div class="lav-radio-indicator" :style="indicatorStyles">
        <transition :name="transitionName">
          <span v-show="val" class="lav-radio-indicator-wrap"></span>
        </transition>
      </div>
    </slot>
    {{ label }}
  </label>
</template>

<script>
export default {
  props: {
    value: Boolean,
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: [String, Number],
      default: 20
    },
    transition: {
      type: String,
      default: 'scale'
    }
  },
  data() {
    return {
      val: this.value
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
        'lav-radio',
        { 'lav-radio-checked': this.val }
      ]
    },
    inGroup() {
      return this.$parent.$options.name === 'lav-radio-group';
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
<style scoped>
.lav-radio {
  position: relative;
  display: flex;
  cursor: pointer;
  margin: 0;
}
.lav-radio-input {
  display: none;
}
.lav-radio-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(206, 212, 218);
  border-radius: 4px;
  background: #fff;
  border-radius: 50%;
}
.lav-radio-indicator-wrap {
  width: 50%;
  height: 50%;
  background: rgb(206, 212, 218);
  border-radius: 50%;
  transform: scale(1.4);
}
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: .2s;
}
.fade-scale-enter, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
