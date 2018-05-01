<template lang="html">
  <div class="lav-image-preload" :style="wrapStyles">
    <lav-loader v-if="loading" />
    <img v-else class="lav-image-preload-src" :src="src" />
  </div>
</template>

<script>
import lavLoader from '../../components/loader';
export default {
  components: { lavLoader },
  props: {
    src: String,
    height: [String, Number],
    width: [String, Number]
  },
  mounted() {
    this.image = new Image();
    this.image.onload = () => this.loading = false;
    this.image.src = this.src;
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    wrapStyles() {
      return {
        height: this.height ? (this.height + 'px') : '100%',
        width: this.width ? (this.width + 'px') : '100%'
      }
    }
  }
}
</script>

<style lang="css">
.lav-image-preload {
  display: flex;
  justify-content: center;
  align-items: center;
}
.lav-image-preload-src {
  width: 100%;
  height: 100%;
}
</style>
