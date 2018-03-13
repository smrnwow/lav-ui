<template lang="html">
  <label class="control">
    <input type="radio" class="control__input" v-model="model" @change="handleChange">
    <div class="control__indicator">
      <transition name="fade-scale">
        <span v-show="model === sense" class="control__indicator-wrap"></span>
      </transition>
    </div>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    value: {},
    sense: {}
  },
  methods: {
    handleChange(e) {
      this.$emit('input', this.sense);
    }
  },
  computed: {
    inGroup() {
      return this.$parent.$options.name === 'radio-group';
    },
    model: {
      get() {
        return (this.inGroup) ? this.$parent.value : this.value;
      },
      set(val) {
        this.inGroup ? this.$parent.$emit('input', val) : this.$emit('input', val);
      }
    }
  }
}
</script>
<style scoped>
.control {
  position: relative;
  cursor: pointer;
  height: 20px;
  width: 20px;
  margin: 0;
}
.control__input {
  display: none;
}
.control__indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(206, 212, 218);
  border-radius: 4px;
  height: 20px;
  width: 20px;
  background: #fff;
  border-radius: 50%;
}
.control__indicator-wrap {
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