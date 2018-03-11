import bus from '../../helpers/bus.js';

const modal = {
  open() {
    bus.$emit('lav-modal-open');
  },
  close() {
    bus.$emit('lav-modal-close');
  }
}

export default modal;