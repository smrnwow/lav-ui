<template>
  <div class="lav-modal-wrap">
    <transition name="lav-fade">
      <div v-if="overlayVisible" class="lav-modal-overlay"></div>
    </transition>
    <transition name="lav-slide-up">
      <div class="lav-modal" v-show="visible" :style="styles">
        <div class="lav-modal-inner">
          <div class="lav-modal-header">
            <slot name="header"></slot>
            <span class="lav-modal-close" @click="close">
              <lav-icon name="close"></lav-icon>
            </span>
          </div>
          <div class="lav-modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script src="./modal.js"></script>
<style scoped>
.lav-modal-overlay {
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
.lav-modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  max-width: 600px;
  background-color: #fff;
  /* padding: 20px; */
  z-index: 120;
}
.lav-modal-inner {
  position: relative;
  height: 100%;
}
.lav-modal-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
.lav-modal-body {
  height: calc(100% - 60px);
  padding: 20px;
  overflow-y: auto;
}
</style>


