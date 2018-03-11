import notification from './index.vue';
const Factory = Vue.extend(notification);


let notifs = [];
let id = 0;
const notif = {
  state: {
    position: 'top-right',
    offset: 20
  },
  add(opts = {}) {
    let instance = new Factory({ data: opts });
    instance.vm = instance.$mount();
    instance.vm.id = id++;
    this._setState(opts);
    notifs.unshift(instance.vm);
    document.body.append(instance.vm.$el);
    instance.vm.visible = true;
    this._rerender();
    instance.vm.$on('close', id => {
      this._remove(id);
    });      
  },
  _setState({ position = 'top-right', offset = 20 } = {}) {
    this.state.position = position;
    this.state.offset = offset;
  },
  _remove(id) {
    notifs = notifs.filter(item => item.id !== id);
    this._rerender();
  },
  _rerender() {
    Vue.nextTick(() => {
      let offset = this.state.offset;
      notifs.filter(item => item.position === this.state.position).forEach((item, i) => {
        item.$el.style[this.state.position.split('-')[0]] = offset + (15 * i) + 'px';
        offset += item.$el.offsetHeight;
      })
    })
  }
}


export default notif;