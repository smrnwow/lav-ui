<template lang="html">
  <div class="lav-menu-three">
    <div class="lav-menu-three-title" @click="toggle">
      <slot name="title"></slot>
      <lav-icon :name="icon" color="#fff" :size="14" />
    </div>
    <div :class="classes" ref="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import lavIcon from '../../icon';
export default {
  name: 'lav-three',
  components: { lavIcon },
  props: {
    name: String
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible;
    },
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  },
  computed: {
    classes() {
      return [
        'lav-menu-three-content',
        { 'lav-menu-three-content--opened': this.visible }
      ]
    },
    icon() {
      return this.visible ? 'arrow-down' : 'arrow-left';
    }
  }
}
</script>

<style lang="css">
.lav-menu-three-title {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 18px;
}
.lav-menu-three-content {
  height: 0px;
  padding-left: 10px;
  overflow-y: hidden;
  transition: .2s ease-in-out;
}
.lav-menu-three-content--opened {
  height: auto;
}
</style>
