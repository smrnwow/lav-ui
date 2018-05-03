<template lang="html">
  <div class="lav-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'lav-checkbox-group',
  props: {
    value: Array
  },
  created() {
    this.$on('child-change', this.handleChildChange);
  },
  methods: {
    handleChildChange(e) {
      let newValue;
      if(this.value.includes(e)) {
        newValue = this.value.filter(item => item !== e);
      } else {
        newValue = [...this.value, e];
      }
      this.$emit('input', newValue);
    }
  }
}
</script>

<style lang="css">
/*.checkbox-group {
  display: flex;
  background-color: #fff;
  text-align: left;
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  color: #576077;
  border: 2px solid rgb(224, 224, 224);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: hidden;
}
  .control {
    height: 100%!important;
    width: calc(100% / 7)!important;
    padding: 10px 0;
    text-align: center;
    transition: .1s ease-in-out;
    user-select: none;
    &_checked {
      background-color: rgb(224, 224, 224);
    }
    &:not(:last-child) {
      border-right: 2px solid rgb(224, 224, 224);
    }
    &__indicator {
      display: none!important;
    }
  }
}*/
</style>
