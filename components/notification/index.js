import notification from './index.vue';
const Factory = Vue.extend(notification);


let notifs = [];
let id = 0;

const notif = {
  add(opts = {}) {
    let instance = new Factory({ data: opts });
    instance.vm = instance.$mount();
    instance.vm.id = id++;
    notifs.push(instance.vm);
    document.body.append(instance.vm.$el);
    this.rerender();
    instance.vm.visible = true;
    instance.vm.$on('close', id => {
      this.remove(id);
    });      
  },
  remove(id) {
    notifs = notifs.filter(item => item.id !== id);
    this.rerender();
  },
  rerender() {
    Vue.nextTick(() => {
      notifs.forEach((item, i) => item.$el.style.top = item.$el.offsetHeight * (i + 1) + 'px');
    })
    
  }
  

}


export default notif;