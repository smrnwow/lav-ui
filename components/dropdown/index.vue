<template>
  <div class="lav-dropdown-wrap" ref="wrap">
    <div ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <transition name="fade">
      <div v-show="visible" class="lav-dropdown">
        <slot name="body"></slot>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    eventTrigger: {
      type: String,
      default: 'click'
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    if(this.eventTrigger === 'click') {
      this.$refs.trigger.addEventListener('click', this.toggle);
    } else if(this.eventTrigger === 'hover') {
      this.$refs.trigger.addEventListener('mouseover', this.open);
      this.$refs.trigger.addEventListener('mouseleave', this.close)  
    }
    
    window.addEventListener('click', e => {
      if(!this.$refs.wrap.contains(e.target)) this.close();
    });
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
    }
  }
}
</script>

<style lang="css">
.lav-dropdown-wrap {
  position: relative;
  display: inline-block;
}
.lav-dropdown {
  position: absolute;
  right: 0;
  width: 100%;
  top: 100%;
  z-index: 100;
}

.fade-enter-active, .fade-leave-active {
  transition: .2s ease-in-out;
}
.fade-enter, .fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

</style>
