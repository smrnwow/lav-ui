<template lang="html">
  <div class="tabs" :style="tabsStyles">
    <div class="tabs-nav" ref="nav" :style="navStyles">
      <slot></slot>
      <span class="tabs-line" ref="line"></span>
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
      type: [Number, String],
      default: 'first'
    },
    direction: {
      type: String,
      default: 'horizontal'
    }
  },
  data() {
    return {
      current: null
    }
  },
  created() {
    this.$on('change-tab', this.changeTabHandler);
  },
  mounted() {
    this._setTabs();
    this.changeTabHandler({ current: this.default });
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

      this.lineStyles(currentTab);
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
    },
    lineStyles(current) {
      let { width, height, left, top } = current.$el.getBoundingClientRect();
      let navLeft = this.$refs.nav.getBoundingClientRect().left;
      let navTop = this.$refs.nav.getBoundingClientRect().top;
      if(this.direction === 'horizontal') {
        this.$refs.line.style.width = width + 'px';
        this.$refs.line.style.left = (left - navLeft) + 'px';
        this.$refs.line.style.bottom = 0;
        this.$refs.line.style.height = '2px';
      } else {
        this.$refs.line.style.height = height + 'px';
        this.$refs.line.style.top = (top - navTop) + 'px';        
        this.$refs.line.style.left = 0;
        this.$refs.line.style.width = '2px';
      }
    }
  },
  computed: {
    tabsStyles() {
      return {
        flexDirection: (this.direction === 'horizontal') ? 'column' : 'row'
      }
    },
    navStyles() {
      let isHorizontal = (this.direction === 'horizontal') ? true : false;
      let styles = {};
      styles.flexDirection = (isHorizontal) ? 'row' : 'column';
      styles[isHorizontal ? 'borderBottom' : 'borderLeft'] = '1px solid rgba(0,0,0, .1)';
      return styles;
    }
  }
}
</script>

<style lang="css">
.tabs {
  display: flex;
}
.tabs-nav {
  display: flex;
  position: relative;
}
.tabs-arrow {
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #576076;
}
.tabs-line {
  position: absolute;
  transition: .2s ease-in-out;
  background-color: rgba(0,0,0,.8);
}
.tab {
  text-align: center;
  transition: .2s ease-in-out;
  width: 100%;
  font-weight: 300;
  padding: 10px 0;
  color: rgba(0,0,0, .6);
  cursor: pointer;
  user-select: none;
  outline: none;
}
.tab-horizontal {
  margin: 0 2px;
  border-bottom: 2px solid transparent;
}
.tab-vertical {
  margin: 2px 0;
  border-left: 2px solid transparent;  
}
.tab-hovered-horizontal {
  border-bottom: 2px solid rgba(0,0,0, .2);
}
.tab-hovered-vertical {
  border-left: 2px solid rgba(0,0,0, .2);
}
.tab-current {
  color: rgba(0,0,0, .9);
  font-weight: 500;
}
.tab-label {
  padding: 5px 10px;
}
.tab-number {
  border-bottom: 2px solid #fff;
}
.tab-day {
  padding: 5px 10px;
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