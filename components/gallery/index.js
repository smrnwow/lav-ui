import bus from '../../helpers/bus.js';

const gallery = {
  open() {
    bus.$emit('lav-gallery-open');
  },
  close() {
    bus.$emit('lav-gallery-close');
  }
};

export default gallery;