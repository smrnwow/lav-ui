<template lang="html">
  <transition :name="transitionName">
    <div v-show="visible" class="lav-notification" :class="[classes]" 
      @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <div class="lav-notification-header">
        <lav-icon :name="type" :color="iconColor" :size="30" />
      </div>
      <div class="lav-notification-body">
        {{ text }}
        {{ id }}
      </div>
      <span class="lav-notification-close" @click="close">
        <lav-icon name="close" :size="12" />
      </span>
    </div>
  </transition>
</template>

<script>
import lavIcon from '../icon';
export default {
  components: { lavIcon },
  data() {
    return {
      type: 'info',
      position: 'top-right',
      autoclose: false,
      visible: false,
      id: null
    }
  },
  methods: {
    close() {
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
      if(this.autoclose) {
        this.timer = setTimeout(this.destroy, 5000);
      }
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
        `lav-notification-${this.type}`,
        `lav-notification-${this.position.split('-')[1]}`
      ]
    },
    transitionName() {
      return `lav-slide-${this.position.split('-')[1]}`
    },
    iconColor() {
      if(this.type === 'info') return '#3FB6DC';
      if(this.type === 'warning') return '#FFC800';
      if(this.type === 'success') return '#2DC76D';
      if(this.type === 'alert') return '#FF7052';
    }
  }
}
</script>

<style lang="css">
.lav-notification {
  display: flex;
  position: fixed;
  width: 400px;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,.1);
  cursor: pointer;
  transition: .1s ease-in-out;
  /* border-radius: 5px; */
}
.lav-notification-right {
  right: 20px;
}
.lav-notification-left {
  left: 20px;
}
.lav-notification-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
}
.lav-notification-close {
  position: absolute;
  top: 10px;
  right: 10px;
}
.lav-notification-body {
  display: flex;
  width: 85%;
  padding: 30px 30px 30px 0;
}
.lav-notification-warning {
  border-left: 5px solid #FFC800;
}
.lav-notification-info {
  border-left: 5px solid #3FB6DC;
}
.lav-notification-success {
  border-left: 5px solid #2DC76D;
}
.lav-notification-alert {
  border-left: 5px solid #FF7052;
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