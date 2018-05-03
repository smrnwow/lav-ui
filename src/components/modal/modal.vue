<template>
  <div class="lav-modal-wrap">
    <transition name="lav-fade">
      <div v-if="overlayVisible" class="lav-modal-overlay"></div>
    </transition>
    <transition name="lav-fade">
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
          <div class="lav-modal-footer" v-if="dialog">
            <lav-button color="#FF7052" @click="cancelHandler">{{ cancelButtonText }}</lav-button>
            <lav-button class="lav-modal-button-apply" @click="applyHandler">{{ applyButtonText }}</lav-button>
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
  display: flex;
  flex-direction: column;
  height: 100%;
}
.lav-modal-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  font-weight: bold;
  min-height: 60px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  background-color: rgba(0,0,0,.1);
}
.lav-modal-close {
  cursor: pointer;
}
.lav-modal-body {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
.lav-modal-footer {
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid rgba(0,0,0,.1);
  background-color: rgba(0,0,0,.1);
}
.lav-modal-button-apply {
  margin-left: 20px;
}
</style>
