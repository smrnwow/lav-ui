<template lang="html">
  <label class="lav-switch" :class="classes">
    <input class="lav-switch-input" type="checkbox" v-model="checked" @change="handleChange" />
    <span class="lav-switch-wrapper" :style="wrapperStyles">
      <span class="lav-switch-roll" :style="rollStyles"></span>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    value: Boolean,
    size: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      checked: this.value
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.checked)
    }
  },
  computed: {
    classes() {
      return [
        { 'lav-switch-checked': this.checked }
      ]
    },
    rollStyles() {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        left: (this.checked ? 'calc(100% - ' + (this.size + 2) + 'px)' : 0)
      }
    },
    wrapperStyles() {
      return {
        width: (this.size * 2.5) + 'px',
        height: this.size + 6 + 'px',
        borderRadius: this.size + 'px'
      }
    }
  }
}
</script>

<style lang="css">
.lav-switch {
  position: relative;
  transition: .2s ease-in-out;
}
.lav-switch-input {
  display: none;
}
.lav-switch-wrapper {
  cursor: pointer;
  height: 30px;
  width: 60px;
  display: inline-flex;
  position: relative;
  align-items: center;
  border-radius: 15px;
  border: 2px solid rgb(153, 153, 153);
  transition: .2s ease-in-out;
  box-sizing: border-box;
}
.lav-switch-roll {
  position: absolute;
  border-radius: 50%;
  margin: 0 1px;
  background-color: #777;
  transition: .2s ease-in-out;
}
.lav-switch-checked .lav-switch-roll {
  background-color: #fff;
}
.lav-switch-checked .lav-switch-wrapper {
  background-color: rgb(153, 153, 153);
}
</style>