<template>
  <component :is="iconName" :height="height" :width="width" :color="color" />
</template>

<script>
import close from './close';
import arrowDown from './arrow-down';
import arrowUp from './arrow-up';
import arrowLeft from './arrow-left';
import arrowRight from './arrow-right';
import pen from './pen';
import eye from './eye';

export default {
  components: { close, arrowDown, arrowUp, arrowLeft, arrowRight, pen, eye },
  props: {
    iconName: String,
    height: {
      type: [Number, String],
      default: 16
    },
    width: {
      type: [Number, String],
      default: 16
    },
    color: {
      type: String,
      default: 'rgba(0,0,0,.5)'
    }
  }
}
</script>