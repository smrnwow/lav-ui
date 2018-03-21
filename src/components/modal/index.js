import bus from '../../helpers/bus.js';

const modal = {
  open(name) {
    bus.$emit('lav-modal-open', name);
  },
  close(name) {
    bus.$emit('lav-modal-close', name);
  }
}

export default modal;