import lavIcon from '../icon';
import thumbs from './thumbs.vue';
import bus from '../../helpers/bus.js';
export default {
  components: { thumbs, lavIcon },
  props: {
    images: {
      type: Array,
      default: () => ([])
    },
    thumbs: {
      type: Boolean,
      default: true
    },
    name: String
  },
  data() {
    return {
      active: 0,
      visible: false,
      transition: 'lav-gallery-next'
    }
  },
  mounted() {
    bus.$on('lav-gallery-open', this.open);
    bus.$on('lav-gallery-close', this.close);
    window.addEventListener('keydown', this.handleKeyboard);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyboard);
  },
  methods: {
    open(name) {
      if(this.name === name) {
        this.visible = true;
      }
    },
    close() {
      this.visible = false;
      this.active = 0;
    },
    next() {
      this.setNextTransition();
      if(this.active < this.images.length - 1) {
        this.active++;
      }
    },
    prev() {
      this.setPrevTransition();
      if(this.active > 0) {
        this.active--;
      }
    },
    handleSelect(index) {
      if(this.active > index) {
        this.setPrevTransition();
      } else {
        this.setNextTransition();
      }
      this.active = index;
    },
    handleKeyboard(e) {
      switch(e.keyCode) {
        case 39: this.next();
          break;
        case 37: this.prev();
          break;
        case 27: this.close();
          break;
      }
    },
    setPrevTransition() {
      this.transition = 'lav-gallery-prev';
    },
    setNextTransition() {
      this.transition = 'lav-gallery-next';
    }
  },
  computed: {
    prevDisabled() {
      return (this.active <= 0) ? 'lav-gallery-arrow_disabled' : '';
    },
    nextDisabled() {
      return (this.active >= this.images.length - 1) ? 'lav-gallery-arrow_disabled' : '';
    },
    classes() {
      return [
        { 'lav-gallery-wrap-without-thumbs': !this.thumbs }
      ]
    }
  }
}
