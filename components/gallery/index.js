// @flow

export default {
  props: {
    images: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      active: 0,
      visible: false
    }
  },
  methods: {
    open() {
      this.visible = true;
      this.$nextTick(() => {
        console.log();
        
        this.thumbHeight = this.$refs.thumb[0].getBoundingClientRect().height + 'px';
      });
  
    },
    close() {
      this.visible = false;
    },
    select(index) {
      this.active = index;
    },
    getActive(index) {
      return (this.active === index) ? 'thumbs__item_active' : '';
    },
    next() {
      if(this.active < this.images.length - 1) {
        this.active++;
      }
    },
    prev() {
      if(this.active > 0) {
        this.active--;
      }
    },
    thumbSize(src) {
      return {
        width: this.thumbHeight,
        backgroundImage: 'url(' + src + ')'
      }
    }
  },
  computed: {
    prevDisabled() {
      return (this.active <= 0) ? 'arrow_disabled' : '';
    },
    nextDisabled() {
      return (this.active >= this.images.length - 1) ? 'arrow_disabled' : '';
    }
  }
}