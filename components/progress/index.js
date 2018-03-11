import bus from '../../helpers/bus.js';

const progress = {
  start() {
    bus.$emit('lav-progress-start');
  },
  finish() {
    bus.$emit('lav-progress-finish');
  }
}

export default progress;

