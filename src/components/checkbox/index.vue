<template lang="html">
  <label class="control" :style="labelStyles">
    <input type="checkbox" :style="inputStyles" v-model="checked" @change="handleChange" />
    <div class="control__indicator" :style="indicatorStyles">
      <transition name="fade-scale">
        <span v-show="checked" class="control__indicator-wrap">
          <svg x="0px" y="0px" viewBox="0 0 342.357 342.357">
          	<polygon points="290.04,33.286 118.861,204.427 52.32,137.907 0,190.226 118.862,309.071 342.357,85.606 "/>
          </svg>
        </span>
      </transition>
    </div>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
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
    labelStyles() {
      return {
        position: 'relative',
        cursor: 'pointer',
        display: 'inline-flex',
        margin: 0,
        userSelect: 'none'
      }
    },
    inputStyles() {
      return {
        display: 'none'
      }
    },
    indicatorStyles() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid rgb(206, 212, 218)',
        borderRadius: '4px',
        height: '20px',
        width: '20px',
        marginRight: '5px',
        background: '#fff'
      }
    }
  }
}
</script>
<style media="screen">
.control__indicator-wrap {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 2px;
  background: rgb(206, 212, 218);
}
.control__indicator-wrap svg {
  width: 100%;
  height: 100%;
  fill: #fff;
}
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: .2s ease-in-out;
}
.fade-scale-enter, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(.5);
  /* transform: translateY(-2px) */
}
</style>