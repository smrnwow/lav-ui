<template>
  <svg :height="height" :width="width" :fill="color" viewBox="0 0 300 250">
	  <polygon points="153,58.65 0,211.65 35.7,247.35 153,130.05 270.3,247.35 306,211.65 		"/>
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