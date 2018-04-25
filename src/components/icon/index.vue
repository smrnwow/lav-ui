<template>
  <component :is="name" :size="size" :color="color" />
</template>

<script>
import close from './close';
import arrowDown from './arrow-down';
import arrowUp from './arrow-up';
import arrowLeft from './arrow-left';
import arrowRight from './arrow-right';
import pen from './pen';
import eye from './eye';
import eyeClosed from './eye-closed';
import heart from './heart';
import checkMark from './check-mark';
import success from './success';
import alert from './alert';
import info from './info';
import warning from './warning';
import smile from './smile';
import star from './star';
import remove from './remove';
import send from './send';

export default {
  components: { close, arrowDown, arrowUp, arrowLeft, arrowRight, pen, eye, eyeClosed, heart, checkMark, success, alert, info, warning, smile, star, remove, send },
  props: {
    name: String,
    size: {
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
