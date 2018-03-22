<template>
  <div class="lav-dropdown" ref="wrap">
    <div class="lav-dropdown-trigger" ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <transition name="lav-fade">
      <div v-show="visible" class="lav-dropdown-body">
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