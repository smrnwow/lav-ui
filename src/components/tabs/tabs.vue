<template lang="html">
  <div class="tabs">
    <div class="tabs-nav">
      <slot></slot>
    </div>
    <transition name="fade" mode="out-in">
      <div class="tabs-content" :key="current">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    default: {
      type: [Number, String]
    }
  },
  data() {
    return {
      current: this.default,
      content: null
    }
  },
  created() {
    this.$on('change-tab', this.changeTabHandler);
  },
  mounted() {
    this._setTabs();
    this.changeTabHandler();
  },
  methods: {
    changeTabHandler(e) {
      if(e && e.current !== this.current) {
        this.current = e.current;
      }
      this.setCurrentContent();
    },
    setCurrentContent() {
      let currentTab = this.tabs.filter(tb => tb.isCurrent)[0];
      this.$slots.content = currentTab.$slots.content;
    },
    changeTab(type) {
      for(let tab in this.tabs) {
        tab = parseInt(tab);
        if(this.tabs[tab].isCurrent) {
          let nextTabIndex = (type === 'decrement') ? tab - 1 : tab + 1;
          if((nextTabIndex >= 0) && nextTabIndex <= (this.tabs.length - 1)) {
            let nextTab = (type === 'decrement') ? this.tabs[tab - 1].name : this.tabs[tab + 1].name;
            this.$emit('change-tab', { current: nextTab });
          }
          return;
        }
      }
    },
    _setTabs() {
      this.tabs = this.$children.filter(item => item.$options.name === 'tab');
      if(!this.tabs.length) {
        throw new Error('zero tabs privided');
      }
    }
  }
}
</script>

<style lang="css">
.tabs-nav {
  display: flex;
}
.tabs-arrow {
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #576076;
}
.tab {
  background-color: #DEE2EE;
  text-align: center;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
  transition: .2s ease-in-out;
  width: 100%;
  font-weight: 300;
}
.tab-label {
  cursor: pointer;
  user-select: none;
  padding: 5px 10px;
}
.tab-number {
  border-bottom: 2px solid #fff;
}
.tab-day {
  padding: 5px 10px;
}
.tab-current {
  background-color: #576076;
  color: #fff;
}
.tabs-content {
  overflow: hidden;
  padding: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: .2s ease-in-out;
}
.fade-enter {
  opacity: 0;
  transform: translateX(100px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>