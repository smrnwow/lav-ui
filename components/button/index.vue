<template lang="html">
  <button class="lav-button" :type="type" @click="$emit('click')">
    <slot></slot>
    <span class="lav-button__icon">
      <svg v-show="!loading" x="0px" y="0px" viewBox="0 0 284.9 284.9">
        <path d="M222.7,135.9l-133-133C87.7,1,85.6,0,83.1,0c-2.5,0-4.7,1-6.6,2.9L62.2,17.1c-1.9,1.9-2.9,4.1-2.9,6.6s0.9,4.7,2.9,6.6
        l112.2,112.2L62.2,254.7c-1.9,1.9-2.9,4.1-2.9,6.6c0,2.5,0.9,4.7,2.9,6.6l14.3,14.3c1.9,1.9,4.1,2.9,6.6,2.9c2.5,0,4.7-1,6.6-2.9
        l133-133c1.9-1.9,2.9-4.1,2.9-6.6S224.6,137.8,222.7,135.9z"/>
      </svg>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style lang="css">
.lav-button {
  position: relative;
  border: none;
  padding: 10px 50px 10px 25px;
  outline: none;
  min-height: 42px;
  border-radius: 22px;
  color: #fff;
  background-color: rgb(55, 172, 223);
}
.lav-button__icon {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 4px;
  top: 4px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  background-color: rgb(55, 172, 223);
  color: #fff;
  height: 34px;
  width: 34px;
}
.lav-button__icon svg {
  height: 15px;
  width: 15px;
  fill: #fff;
}
</style>
