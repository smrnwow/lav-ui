<template lang="html">
  <div :style="wrapStyles" ref="wrap">
    <div v-for="(src, i) in images" :style="itemsStyles(i, src)" :key="i">
      <span :style="cleanerWrapStyles" @click="removeImage(i)">
        <svg :style="cleanerStyles" x="0px" y="0px" viewBox="0 0 21.9 21.9">
          <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
          c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
        </svg>
      </span>
    </div>
    <label v-if="checkMaxImages" :style="itemsStyles(images.length)">
      <svg :style="iconStyles" x="0px" y="0px" viewBox="0 0 268.5 268.5">
        <path d="M232.9,223.7H35.5c-12.2,0-22.1,10-22.1,22.4s9.9,22.4,22.1,22.4h197.4c12.2,0,22.1-10,22.1-22.4
        C255.1,233.7,245.2,223.7,232.9,223.7z M117.9,199.1c4,4,9.2,6.1,14.5,6.5c0.6,0.1,1.2,0.2,1.9,0.2c0.6,0,1.2-0.1,1.8-0.2
        c5.3-0.4,10.5-2.5,14.5-6.5l70.8-71c8.9-8.9,8.9-23.3,0-32.1c-8.9-8.9-23.2-8.9-32.1,0l-32.7,32.8V22.4c0-12.4-10-22.4-22.4-22.4
        c-12.4,0-22.4,10-22.4,22.4v106.4L79.2,96c-8.9-8.9-23.2-8.9-32.1,0c-8.9,8.9-8.9,23.3,0,32.1L117.9,199.1z"/>
      </svg>
      <input :style="inputStyles" type="file" @change="upload" multiple>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      wrapWidth: 0
    }
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
    },
    itemsStyles(index, src) {
      let smallImageTop;
      if(index >= 2) {
        smallImageTop = ((this.$refs.wrap.offsetHeight * 0.25) * (index - 1)) + 'px';
      }
      let additionStyles = {};
      if(this.images.length > 0 && index === 0) {
        additionStyles = { top: 0, left: 0, width: '80%', height: '99%', backgroundImage: 'url(' + src + ')' };
      } else if(this.images.length > 0 && index > 0) {
        if(index < this.images.length) {
          additionStyles = { right: 0, top: smallImageTop, width: '19%', height: '24%', backgroundImage: 'url(' + src + ')' };
        } else if(index === this.images.length) {
          additionStyles = { ...this.labelStyles, height: '24%', width: '19%', right: 0, top: smallImageTop }
        }
      } else if(index === this.images.length) {
        if(this.images.length === 0) additionStyles = { ...this.labelStyles, height: '99%' }
      }
      return {
        position: 'absolute',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: 100,
        ...additionStyles
      }
    },
    removeImage(index) {
      this.images.splice(index, 1);
      this.$emit('change', this.images);
    }
  },
  computed: {
    checkMaxImages() {
      return this.images.length < 5;
    },
    wrapStyles() {
      this.$nextTick(() => {
        this.wrapWidth = (this.$refs.wrap.getBoundingClientRect().width * 0.8) + 'px';
      });
      return {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: this.wrapWidth
      }
    },
    cleanerWrapStyles() {
      return {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '10%',
        width: '10%',
        minHeight: '25px',
        minWidth: '25px',
        cursor: 'pointer',
        zIndex: 20,
        right: 0,
        backgroundColor: 'rgb(89, 98, 120)'
      }
    },
    cleanerStyles() {
      return {
        height: '50%',
        width: '50%',
        padding: '2px',
        fill: 'rgb(206, 212, 218)',
        transition: '.2s ease-in-out',
      }
    },
    labelStyles() {
      return {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed #BCB8BF',
        cursor: 'pointer'
      }
    },
    iconStyles() {
      return {
        height: '40px',
        fill: '#BCB8BF'
      }
    },
    inputStyles() {
      return {
        display: 'none'
      }
    }
  }
}
</script>

<style lang="css">
</style>