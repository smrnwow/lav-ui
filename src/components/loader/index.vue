<template lang="html">
  <div class="lav-loader" :style="{ height: size + 'px', width: size + 'px' }">
    <svg class="lav-loader-circle" :style="circleStyles" viewBox="25 25 50 50">
      <circle class="lav-loader-circle-path" :style="dashStyles" cx="50" cy="50" r="20" fill="none" :stroke="color" :stroke-width="bold" stroke-miterlimit="10"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'lav-loader',
  props: {
    size: {
      type: [String, Number],
      default: 20
    },
    color: {
      type: String,
      default: '#0286c2'
    },
    bold: {
      type: [String, Number],
      default: 4
    },
    dashSpeed: {
      type: [String, Number],
      default: 1.5
    },
    circleSpeed: {
      type: [String, Number],
      default: 2
    }
  },
  computed: {
    circleStyles() {
      return {
        animation: `rotate ${this.circleSpeed + 's'} linear infinite`
      }
    },
    dashStyles() {
      return {
        animation: `dash ${this.dashSpeed + 's'} ease-in-out infinite`
      }
    }
  }
}
</script>
