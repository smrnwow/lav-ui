<template lang="html">
  <transition :name="transitionName">
    <div v-show="visible" class="notification" :class="[classes]" @click="handleClick" 
      @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <div class="notification__header">
        <slot name="icon"></slot>
      </div>
      <div class="notification__body">
        {{ text }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      type: 'info',
      position: 'top-right',
      visible: false
    }
  },
  methods: {
    handleClick() {
      this.destroy();
    },
    handleMouseEnter() {
      this.finishTimer();
    },
    handleMouseLeave() {
      this.startTimer();
    },
    destroy() {
      this.visible = false;
      setTimeout(() => {
        this.$emit('close', this.id);
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }, 200)
    },
    startTimer() {
      this.timer = setTimeout(this.destroy, 5000);
    },
    finishTimer() {
      clearTimeout(this.timer);
    }
  },
  mounted() {
    this.startTimer();
  },
  computed: {
    classes() {
      return [
        `notification_${this.type}`,
        `notification_${this.position.split('-')[1]}`
      ]
    },
    transitionName() {
      return `lav-slide-${this.position.split('-')[1]}`
    }
  }
}
</script>

<style lang="css">
.notification {
  display: flex;
  position: fixed;
  width: 400px;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,.1);
  cursor: pointer;
  transition: .1s ease-in-out;
  /* border-radius: 5px; */
}
.notification_right {
  right: 20px;
}
.notification_left {
  left: 20px;
}
.notification__header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
}
.notification__body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  padding: 30px 20px;
}
.notification_warn {
  border-left: 3px solid #FFC800;
}
.notification_info {
  border-left: 3px solid #3FB6DC;
}
.notification_success {
  border-left: 3px solid #2DC76D;
}
.notification_alert {
  border-left: 3px solid #FF7052;
}
.notif-leave-active {
  transition: .2s ease-in-out;
}
.notif-enter {
  opacity: 0;  
}
.notif-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>