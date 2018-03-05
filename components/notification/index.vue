<template lang="html">
  <transition name="fade">
    <div v-show="visible" class="notification" :class="[notifType]" @click="close">
      <div class="notification__header">
        <slot name="icon"></slot>
      </div>
      <div class="notification__body">
        test message
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      type: 'info',
      visible: false
    }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit('close', this.id);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  computed: {
    notifType() {
      return `notification_${this.type}`;
    }
  }
}
</script>

<style lang="css">
.notification {
  display: flex;
  position: fixed;
  top: 100px;
  right: 50px;
  width: 400px;
  background: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,.1);
  cursor: pointer;
  /* border-radius: 5px; */
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
  border-left: 3px solid yellow;
}
.notification_info {
  border-left: 3px solid blue;
}
.notification_success {
  border-left: 3px solid green;
}
.notification_alert {
  border-left: 3px solid red;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-in-out;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>