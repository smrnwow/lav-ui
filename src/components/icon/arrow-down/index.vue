<template>
  <svg :height="height" :width="width" :fill="color" viewBox="0 0 300 250">
    <polygon points="270.3,58.65 153,175.95 35.7,58.65 0,94.35 153,247.35 306,94.35 		"/>
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