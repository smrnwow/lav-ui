<template>
  <svg :height="size" :width="size" :fill="color" viewBox="0 0 510 510">
  	<path d="M229.5,382.5h51v-153h-51V382.5z M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z
      M255,459c-112.2,0-204-91.8-204-204S142.8,51,255,51s204,91.8,204,204S367.2,459,255,459z M229.5,178.5h51v-51h-51V178.5z"/>
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