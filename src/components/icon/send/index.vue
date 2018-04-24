<template>
  <svg :height="size" :width="size" :fill="color" viewBox="0 0 535.5 535.5">
  	<polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
  </svg>
</template>

<script>
export default {
  props: {
    size: [Number, String],
    color: String
  }
}
</script>
