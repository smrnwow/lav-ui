import bus from '../../helpers/bus.js';
export default {
  data() {
    return {
      visible: false
    }
  },
  created() {
    bus.$on('lav-modal-open', this.open);
    bus.$on('lav-modal-close', this.close);
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    }
  }
}
