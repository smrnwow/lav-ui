<template>
  <div class="lav-tooltip" ref="wrap" @mouseover="show" @mouseleave="hide">
    <div class="lav-tooltip-trigger" ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <transition :name="transition">
      <div v-show="visible" class="lav-tooltip-body" ref="body">
        <span :class="pointerClasses" ref="pointer"></span>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import directionsMixin from '../../mixins/directions';
export default {
  mixins: [directionsMixin],
  props: {
    trigger: {
      type: String,
      default: 'click'
    },
    position: {
      type: String,
      default: 'bottom-center'
    },
    offset: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.setStyles);
  },
  methods: {
    show() {
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.visible = true;
      }, 100);
    },
    hide() {
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.visible = false;
      }, 300);
    }
  },
  computed: {
    transition() {
      let name = this.position.split('-')[0];
      return `lav-slide-${name}`;
    }
  },
  beforeDestroy() {
    if(this.timer) clearTimeout(this.timer);
    window.addEventListener('scroll', this.setStyles);
  }
}
</script>