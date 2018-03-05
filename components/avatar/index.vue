<template lang="html">
  <div :style="wrapStyles" ref="wrap">
    <img v-show="!error" :src="src" :style="imageStyles" @error="handle" />
    <h1 :style="mountStyles" v-show="error">?</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      width: 0
    }
  },
  props: {
    src: {
      type: String
    },
    circle: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handle() {
      this.error = true;
    },
    calcWidth() {
      this.$nextTick(() => {
        this.width = this.$refs.wrap.getBoundingClientRect().width;
      });
    }
  },
  mounted() {
    this.calcWidth();
    window.addEventListener('resize', this.calcWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calcWidth);
  },
  computed: {
    wrapStyles() {
      return {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: this.width + 'px',
        backgroundColor: this.error ? 'rgb(108, 117, 125)' : 'transparent',
        borderRadius: (this.circle) ? '50%' : 0,
        overflow: 'hidden'
      }
    },
    imageStyles() {
      return {
        width: '100%',
        height: '100%',
        userSelect: 'none'
      }
    },
    mountStyles() {
      return {
        margin: 0,
        fontSize: (this.width * 0.55) + 'px',
        userSelect: 'none',
        color: '#fff'
      }
    }
  }
}
</script>
