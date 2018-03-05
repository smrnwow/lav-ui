<template lang="html">
  <div :style="wrapStyles">
    <input :style="inputStyles" @input="update" v-model="value" :placeholder="placeholder" />

    <svg v-if="showOmega" :style="iconStyles" x="0px" y="0px" viewBox="0 0 512 512">
      <path d="M475.4,96.4l-59.7-59.7c-3.3-3.3-8.7-3.3-12.1,0L53.7,386.5c-0.8,0.8-1.4,1.7-1.8,2.7L9.2,491.7c-1.3,3.2-0.6,6.9,1.8,9.3
      c1.6,1.6,3.8,2.5,6,2.5c1.1,0,2.2-0.2,3.3-0.7l102.4-42.7c1-0.4,2-1,2.7-1.8l349.9-349.9C478.7,105.1,478.7,99.7,475.4,96.4z
      M114.6,445l-81.7,34l34-81.7L409.6,54.7l47.7,47.7L114.6,445z"/>
      <path d="M23.1,488.9c-3.3-3.3-8.7-3.3-12.1,0l-8.5,8.5c-3.3,3.3-3.3,8.7,0,12.1c1.7,1.7,3.8,2.5,6,2.5c2.2,0,4.4-0.8,6-2.5
      l8.5-8.5C26.4,497.6,26.4,492.2,23.1,488.9z"/>
      <path d="M466.8,156.1l-85.3-85.3c-3.3-3.3-8.7-3.3-12.1,0c-3.3,3.3-3.3,8.7,0,12.1l79.3,79.3l-122,122c-3.3,3.3-3.3,8.7,0,12.1
      c1.7,1.7,3.8,2.5,6,2.5c2.2,0,4.4-0.8,6-2.5l128-128C470.2,164.8,470.2,159.4,466.8,156.1z"/>
      <rect x="81.1" y="380.2" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -272.4384 187.071)" width="17.1" height="84.5"/>
      <path d="M509.5,28.1L483.9,2.5c-3.3-3.3-8.7-3.3-12.1,0l-51.2,51.2c-3.3,3.3-3.3,8.7,0,12.1c3.3,3.3,8.7,3.3,12.1,0l45.2-45.2
      l13.5,13.5l-45.2,45.2c-3.3,3.3-3.3,8.7,0,12.1c1.7,1.7,3.8,2.5,6,2.5c2.2,0,4.4-0.8,6-2.5l51.2-51.2
      C512.8,36.8,512.8,31.4,509.5,28.1z"/>
      <rect x="200.5" y="260.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -152.9738 236.557)" width="17.1" height="84.5"/>
    </svg>

    <svg :style="iconStyles" v-if="showCleaner" x="0px" y="0px" viewBox="0 0 21.9 21.9" @click="clearInput">
      <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
      c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  props: {
    customInputStyles: {
      type: Object,
      default: () => ({})
    },
    customWrapStyles: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: ''
    },
    omega: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showCleaner() {
      return this.value.length > 0;
    },
    showOmega() {
      return this.omega && this.value.length <= 0;
    },
    wrapStyles() {
      return {
        position: 'relative',
        ...this.customWrapStyles
      }
    },
    inputStyles() {
      return {
        ...this.customInputStyles
      }
    },
    iconStyles() {
      return {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        height: '20px',
        width: '20px',
        right: '10px',
      }
    }
  },
  methods: {
    clearInput() {
      this.value = '';
      this.$emit('input', '');
    },
    update(e) {
      this.$emit('input', e.target.value);
    },
  }
}
</script>

<style lang="css">
.form-input {
  border-radius: 0;
  border: 0;
  padding: 0 10px;
  line-height: 30px;
  outline: none;
  font-size: 16px;
  width: 100%;
}
.form-input__wrap {
  border: 2px solid #333;
  width: 100%;
  position: relative;
}
.form-input__cleaner {
  position: absolute;
  top: calc(50% - 8px);
  cursor: pointer;
  height: 16px;
  width: 16px;
  padding: 2px;
  right: 8px;
}
</style>
