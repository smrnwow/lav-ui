<template>
  <div class="lav-dropdown" ref="wrap">
    <div class="lav-dropdown-trigger" ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <transition :name="transition">
      <div v-show="visible" class="lav-dropdown-body" ref="body">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import directionsMixin from '../../mixins/directions';
export default {
  name: 'lav-dropdown',
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
  beforeDestroy() {
    this.removeListeners();
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
    blur(e) {
      if(!this.$refs.wrap.contains(e.target)) this.close();
    },
    onScroll() {
      if(this.visible) this.setStyles();
    },
    addListeners() {
      if(this.trigger === 'click') {
        this.$refs.trigger.addEventListener('click', this.toggle);
      } else if(this.trigger === 'hover') {
        this.$refs.trigger.addEventListener('mouseover', this.open);
        this.$refs.trigger.addEventListener('mouseleave', this.close)
      }
      window.addEventListener('click', this.blur);
      window.addEventListener('scroll', this.onScroll);
    },
    removeListeners() {
      if(this.trigger === 'click') {
        this.$refs.trigger.removeEventListener('click', this.toggle);
      } else if(this.trigger === 'hover') {
        this.$refs.trigger.removeEventListener('mouseover', this.open);
        this.$refs.trigger.removeEventListener('mouseleave', this.close)
      }
      window.removeEventListener('click', this.blur);
      window.removeEventListener('scroll', this.onScroll);
    }
  },
  computed: {
    transition() {
      let name = this.position.split('-')[0];
      return `lav-slide-top`;
    }
  }
}
</script>
