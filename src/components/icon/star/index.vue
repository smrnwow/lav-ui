<template>
  <svg :height="size" :width="size" :fill="color" viewBox="0 0 306 306">
  	<polygon points="153,230.775 247.35,299.625 211.65,187.425 306,121.125 191.25,121.125 153,6.375 114.75,121.125 0,121.125
  		94.35,187.425 58.65,299.625"/>
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
