<template lang="html">
  <label :style="wrapStyles" class="lav-label" ref="wrap">
    <svg class="lav-icon" :style="iconStyles" x="0px" y="0px" viewBox="0 0 268.5 268.5">
      <path d="M232.9,223.7H35.5c-12.2,0-22.1,10-22.1,22.4s9.9,22.4,22.1,22.4h197.4c12.2,0,22.1-10,22.1-22.4
      C255.1,233.7,245.2,223.7,232.9,223.7z M117.9,199.1c4,4,9.2,6.1,14.5,6.5c0.6,0.1,1.2,0.2,1.9,0.2c0.6,0,1.2-0.1,1.8-0.2
      c5.3-0.4,10.5-2.5,14.5-6.5l70.8-71c8.9-8.9,8.9-23.3,0-32.1c-8.9-8.9-23.2-8.9-32.1,0l-32.7,32.8V22.4c0-12.4-10-22.4-22.4-22.4
      c-12.4,0-22.4,10-22.4,22.4v106.4L79.2,96c-8.9-8.9-23.2-8.9-32.1,0c-8.9,8.9-8.9,23.3,0,32.1L117.9,199.1z"/>
    </svg>
    <input class="lav-input-file" type="file" @change="upload" multiple>
  </label>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      wrapWidth: 0
    }
  },
  props: {
    props: Object
  },
  methods: {
    upload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      for(let i = 0; i < files.length; i++) {
        this.createImage(files[i]);
      }
    },
    createImage(file) {
      let reader = new FileReader();
      reader.addEventListener('load', e => {
        if(this.checkMaxImages) {
          this.images.push(e.target.result);
          this.$emit('change', this.images);
        }
      });
      reader.readAsDataURL(file);
    }
  },
  computed: {
    wrapStyles() {
      this.$nextTick(() => {
        this.wrapWidth = (this.$refs.wrap.getBoundingClientRect().width * 0.8) + 'px';
      });
      return {
        height: this.wrapWidth
      }
    },
    iconStyles() {
      return {
        height: '40px'
      }
    }
  }
}
</script>