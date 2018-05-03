import notification from './index.vue';
import Queue from '../../helpers/queue';

const queue = new Queue();
const Factory = Vue.extend(notification);



const NotifyController = {
  state: {
    config: {
      position: 'top-right',
      offset: 20,
      max: 3
    },
    notifs: [],
    id: 0
  },
  info(opts = {}) {
    this._add({ ...opts, type: 'info' });
  },
  alert(opts = {}) {
    this._add({ ...opts, type: 'alert' });
  },
  success(opts = {}) {
    this._add({ ...opts, type: 'success' });
  },
  warning(opts = {}) {
    this._add({ ...opts, type: 'warning' });
  },
  _add(opts = {}) {
    let instance = new Factory({ data: opts });
    this._setState(opts);
    this._spread(instance);
    this._rerender();
  },
  _setState({ position = 'top-right', offset = 20 } = {}) {
    this.state.config.position = position;
    this.state.config.offset = offset;
  },
  _spread(instance) {
    if((this.state.notifs.length < this.state.config.max) && (queue.isEmpty())) {
      this._createInstance(instance);
    } else {
      queue.add(instance);
    }
  },
  _addFromQueue() {
    if(queue.isEmpty()) return false;
    this._createInstance(queue.getFirst());
    this._rerender();
  },
  _createInstance(instance) {
    instance.vm = instance.$mount();
    instance.vm.id = this.state.id++;
    this.state.notifs.push(instance.vm);
    document.body.append(instance.vm.$el);
    instance.vm.visible = true;
    instance.vm.$on('close', id => this._remove(id));
  },
  _remove(id) {
    this.state.notifs = this.state.notifs.filter(item => item.id !== id);
    this._rerender();
    this._addFromQueue();
  },
  _rerender() {
    Vue.nextTick(() => {
      let offset = this.state.config.offset;
      this.state.notifs.filter(item => item.position === this.state.config.position).forEach((item, i) => {
        item.$el.style[this.state.config.position.split('-')[0]] = offset + (15 * i) + 'px';
        offset += item.$el.offsetHeight;
      })
    })
  }
}


export default NotifyController;
