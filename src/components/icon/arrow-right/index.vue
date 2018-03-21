<template>
  <svg :height="height" :width="width" :fill="color" viewBox="0 0 400 400">
    <path d="M17.3,217.3h323.6l-77.2,77.2c-6.8,6.8-6.8,17.7,0,24.5c6.8,6.8,17.7,6.8,24.5,0l106.8-106.8c6.8-6.8,6.8-17.7,0-24.5
      L288.2,81c-3.4-3.4-7.8-5.1-12.2-5.1s-8.9,1.7-12.2,5.1c-6.8,6.8-6.8,17.7,0,24.5l77.2,77.2H17.3C7.8,182.7,0,190.4,0,200
      C0,209.6,7.8,217.3,17.3,217.3z"/>
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