<template>
  <transition name="fade">
    <div v-if="visible" class="lav-progress" :style="styles"></div>
  </transition>
</template>

<script>
import bus from '../../helpers/bus.js';
export default {
  props: {
    progress: Number,
    color: {
      type: String,
      default: '#0286c2'
    }
  },
  data() {
    return {
      prgrss: 0,
      status: 'started',
      visible: true
    }
  },
  created() {
    bus.$on('lav-progress-start', this.start);
    bus.$on('lav-progress-finish', this.finish);
  },
  methods: {
    start() {
      this.setStatus('started');
      this.setProgress(0);
    },
    finish() {
      setTimeout(() => {
        this.setStatus('finished');
        this.setProgress(100);
      }, 100)
    },
    setProgress(progress) {
      this.prgrss = progress;
    },
    setStatus(status) {
      this.status = status;
    },
    hide() {
      this.visible = false;
    },
    show() {
      this.visible = true;
    }
  },
  watch: {
    progress(n) {
      if(this.status !== 'finished') this.setProgress(n);
    },
    prgrss(n) {
      if(n >= 100) this.setStatus('finished');
    },
    status(n) {
      if(n === 'finished') {
        setTimeout(this.hide, 300);
      } else if(n === 'started') {
        this.show();
      }
    }
  },
  computed: {
    styles() {
      return {
        transform: 'scaleX(' + this.prgrss / 100 + ')',
        backgroundColor: this.color
      }
    }
  }
}
</script>

