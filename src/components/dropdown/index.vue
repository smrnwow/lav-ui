<template>
  <div class="lav-dropdown" ref="wrap">
    <div class="lav-dropdown-trigger" ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <transition :name="transition">
      <div v-show="visible" class="lav-dropdown-body" ref="body">
        <span :class="pointerClasses" ref="pointer"></span>
        <slot name="body"></slot>
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
      window.addEventListener('scroll', e => {
        if(this.visible) this.setStyles();
      });
    },
  },
  computed: {
    transition() {
      let name = this.position.split('-')[0];
      return `lav-slide-top`;
    }
  }
}
</script>