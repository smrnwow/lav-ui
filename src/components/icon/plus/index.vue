<template>
  <svg :height="size" :width="size" :fill="color" viewBox="0 0 357 357">
  	<path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"/>
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
