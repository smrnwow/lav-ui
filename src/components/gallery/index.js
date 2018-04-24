import bus from '../../helpers/bus.js';

const gallery = {
  open(name) {
    bus.$emit('lav-gallery-open', name);
  },
  close() {
    bus.$emit('lav-gallery-close');
  }
};

export default gallery;
