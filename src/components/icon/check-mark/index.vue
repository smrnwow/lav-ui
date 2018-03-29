<template>
  <svg :height="size" :width="size" :fill="color" viewBox="0 0 448.8 448.8">
    <polygon points="142.8,323.85 35.7,216.75 0,252.45 142.8,395.25 448.8,89.25 413.1,53.55 		"/>
  </svg>
</template>
<script>
export default {
  props: {
    size: [Number, String],
    color: String,
  }
}
</script>
