import lavIcon from '../icon';
import bus from '../../helpers/bus.js';
export default {
  components: { lavIcon },
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    name: {
      type: String
    },
    fullHeight: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  created() {
    bus.$on('lav-modal-open', this.open);
    bus.$on('lav-modal-close', this.close);
  },
  computed: {
    overlayVisible() {
      return this.overlay && this.visible;
    },
    styles() {
      return {
        height: this.fullHeight ? '100%' : 'auto'
      }
    }
  },
  methods: {
    open(name) {
      if(this.name === name) {
        this.visible = true;
      }
    },
    close() {
      this.visible = false;
    }
  }
}
