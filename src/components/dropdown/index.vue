<template>
  <div class="lav-dropdown" ref="wrap">
    <div class="lav-dropdown-trigger" ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <transition :name="transition">
      <div v-show="visible" class="lav-dropdown-body" ref="body">
        <!--<span :class="pointerClasses" :style="pointerStyles"></span>-->
        <slot name="body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    position: {
      type: String,
      default: 'bottom-center'
    },
    offset: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.addListeners();
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    toggle() {
      this.visible = !this.visible;
    },
    addListeners() {
      if(this.trigger === 'click') {
        this.$refs.trigger.addEventListener('click', this.toggle);
      } else if(this.trigger === 'hover') {
        this.$refs.trigger.addEventListener('mouseover', this.open);
        this.$refs.trigger.addEventListener('mouseleave', this.close)  
      }
      window.addEventListener('click', e => {
        if(!this.$refs.wrap.contains(e.target)) this.close();
      });
      window.addEventListener('scroll', e => this.setStyles());
    },
    setStyles() {
      let triggerPos = this.$refs.trigger.getBoundingClientRect();
      let bodyPos = this.$refs.body.getBoundingClientRect();
      let fProp = this.isVertical ? this.second : this.first;
      let sProp = this.isVertical ? this.first : this.second;
      this.$refs.body.style.top = this[fProp](triggerPos, bodyPos);
      this.$refs.body.style.left = this[sProp](triggerPos, bodyPos);
    },
    topVertical(trigger, body) {
      return trigger.top + 'px';
    },
    topHorizontal(trigger, body) {
      return (trigger.top - body.height) - this.offset + 'px';
    },
    centerVertical(trigger, body) {
      return ((trigger.top + (trigger.height / 2)) - (body.height / 2)) + 'px';
    },
    centerHorizontal(trigger, body) {
      return ((trigger.left + (trigger.width / 2)) - (body.width / 2)) + 'px';
    },
    bottomVertical(trigger, body) {
      return trigger.top + 'px'
    },
    bottomHorizontal(trigger, body) {
      return (trigger.top + trigger.height) + this.offset + 'px';
    },
    leftVertical(trigger, body) {
      return (trigger.left - body.width) - this.offset + 'px';
    },
    leftHorizontal(trigger, body) {
      return ((trigger.left + trigger.width) - body.width) + 'px';
    },
    rightVertical(trigger, body) {
      return (trigger.left + trigger.width) + this.offset + 'px';
    },
    rightHorizontal(trigger, body) {
      return trigger.left + 'px';
    }
  },
  watch: {
    visible(n) {
      if(n) {
        this.$nextTick(() => this.setStyles());
      }
    }
  },
  computed: {
    isVertical() {
      let name = this.position.split('-')[0];
      return (name === 'left' || name === 'right');
    },
    transition() {
      let name = this.position.split('-')[0];
      return `lav-slide-${name}`;
    },
    second() {
      let name = this.position.split('-')[1];
      return this.isVertical ? `${name}Vertical` : `${name}Horizontal`;
    },
    first() {
      let name = this.position.split('-')[0];
      return this.isVertical ? `${name}Vertical` : `${name}Horizontal`;
    },
    pointerClasses() {
      let name = this.position.split('-')[0];
      return [
        'lav-dropdown-pointer',
        `lav-dropdown-pointer-${name}`
      ]
    }
  }
}
</script>