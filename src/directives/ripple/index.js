export default {
  bind(el, binding, vnode) {
    el.addEventListener('click', e => {
      el.classList.add('lav-ripple');
      let rippleInner = el.querySelector('.lav-ripple-inner');
      if(rippleInner) {
        rippleInner.classList.remove('lav-ripple-animate');
      } else {
        rippleInner = document.createElement('span');
        rippleInner.classList.add('lav-ripple-inner');
        rippleInner.style.width = rippleInner.style.height = Math.max(el.offsetWidth, el.offsetHeight) + 'px';
        el.appendChild(rippleInner);
        rippleInner.style.backgroundColor = binding.value || 'rgba(255, 255, 255, .3)';
      }
      rippleInner.style.left = (e.offsetX - rippleInner.offsetWidth / 2) + 'px';
      rippleInner.style.top = (e.offsetY - rippleInner.offsetHeight / 2) + 'px';
      rippleInner.classList.add('lav-ripple-animate');
    });
  }
};