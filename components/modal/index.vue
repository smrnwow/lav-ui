<template>
  <transition name="fade">
    <div v-show="visible" class="wrap">
      <div class="modal">

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    }
  }
}
</script>
<style scoped>
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: rgba(0,0,0,.8);
  overflow-y: auto;
  overflow-x: hidden;
}
.modal {
  max-width: 600px;
}
</style>


