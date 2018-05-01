<template lang="html">
  <div class="lav-menu-three">
    <div class="lav-menu-three-title" @click="toggle">
      <slot name="title"></slot>
      <lav-icon :name="icon" color="#fff" :size="14" />
    </div>
    <div class="lav-menu-three-content" ref="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import lavIcon from '../../icon';
export default {
  name: 'lav-three',
  components: { lavIcon },
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
    },
    setHeight() {
      if(this.visible) {
        this.$refs.body.style.height = 'auto';
        this.$refs.body.style.height = this.$refs.body.scrollHeight + 'px';
      } else {
        this.$refs.body.style.height = 'auto';
        this.$refs.body.style.height = '0px';
      }
      if(this.$parent.$options.name === 'lav-three') {
        this.$parent.setHeight();
      }
    }
  },
  computed: {
    icon() {
      return this.visible ? 'arrow-down' : 'arrow-left';
    }
  },
  mounted() {
    this.setHeight();
  },
  watch: {
    visible(n) {
      this.setHeight();
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
  padding-left: 10px;

  overflow-y: hidden;
  transition: .2s ease-in-out;
}
</style>
