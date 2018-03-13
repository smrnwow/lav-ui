<template lang="html">
  <div class="lav-images-grid" ref="wrap" :style="{ height }">
    <div v-for="(src, i) in images" class="lav-images-grid__item" :style="getSize(i)" :key="i">
      <div class="lav-images-grid__image" :style="{ backgroundImage: 'url(' + src + ')' }"></div>
    </div>
    <lav-file-input v-if="downloader" />
  </div>
</template>

<script>
import { lavFileInput } from '../file-input/index.vue';
export default {
  components: { lavFileInput },
  props: {
    images: {
      type: Array,
      default: () => ([])
    },
    downloader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      height: 0,
      loading: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.height = this.$refs.wrap.getBoundingClientRect().width + 'px';
    });
  },
  methods: {
    getSize(index) {
      let isImagesEven = (this.images.length % 2 === 0),
          styles = {};
      if(index === 0) {
        styles['width'] = '100%';
        styles['height'] = '80%';
      } else {
        styles['width'] = (100 / (this.images.length - 1)) + '%';
        styles['height'] = '20%';
      }
      return styles;
    }
  }
}
</script>
<style lang="css">
.lav-images-grid {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
}
.lav-images-grid__item {
  width: calc(100% / 3);
  height: calc(100% / 3);
  padding: 5px;
  cursor: pointer;
}
.lav-images-grid__image {
  border-radius: 5px;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
}
</style>
