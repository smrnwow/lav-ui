<template>
  <svg :height="height" :width="width" :fill="color" viewBox="0 0 459 459">
    <path d="M0,362.1V459h96.9l280.5-283.05l-96.9-96.9L0,362.1z M451.35,102c10.2-10.2,10.2-25.5,0-35.7L392.7,7.649
      c-10.2-10.2-25.5-10.2-35.7,0l-45.9,45.9l96.9,96.9L451.35,102z"/>
  </svg>
</template>

<script>
export default {
  props: {
    height: [Number, String],
    width: [Number, String],
    color: String
  }
}
</script>
