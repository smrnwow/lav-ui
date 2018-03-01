<template lang="html">
  <div class="tabs" :style="[tabsStyles]">
    <slot></slot>
    <div class="tabs__line" :style="[lineStyles]"></div>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    },
    defaultActive: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      line: {},
      current: this.defaultActive - 1
    }
  },
  mounted() {
    this.line = {
      width: this.horizontal ? this.$children[this.current].$el.getBoundingClientRect().width + 'px' : '100%',
      left: this.horizontal ? this.$children[this.current].$el.getBoundingClientRect().left - this.$el.getBoundingClientRect().left + 'px' : 0,
      height: this.vertical ? this.$children[this.current].$el.getBoundingClientRect().height + 'px' : 'auto',
      top: this.vertical ? this.$children[this.current].$el.getBoundingClientRect().top - this.$el.getBoundingClientRect().top + 'px' : 'auto',
      bottom: this.horizontal ? 0 : 'auto'
    };
    this.$on('change-tab', ({ data, index }) => {
      this.line = data;
    });
  },
  methods: {
    calc() {
        let childWidth = 0;
        for(let item in this.$children) {
            childWidth += this.$children[item].$el.getBoundingClientRect().width;
        }
        if(childWidth > this.$el.getBoundingClientRect().width) {
            console.log(childWidth - this.$el.getBoundingClientRect().width)
        }
    }
  },
  computed: {
    horizontal() {
      return this.direction === 'horizontal';
    },
    vertical() {
      return this.direction === 'vertical';
    },
    tabsStyles() {
      return {
        width: this.horizontal ? '100%' : 'auto',
        height: this.vertical ? '100%' : 'auto',
        flexDirection: this.horizontal ? 'row' : 'column'
      }
    },
    lineStyles() {
      return {
        width: this.horizontal ? this.line.width : '100%',
        height: this.vertical ? this.line.height : '100%',
        top: this.vertical ? this.line.top : 'auto',
        bottom: this.horizontal ? 0 : 'auto',
        left: this.horizontal ? this.line.left : 0
      }
    }
  }
}
</script>

<style lang="css">
.tabs {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #007FB2;
    border-radius: 5px;
}
.tab {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 10;
    cursor: pointer;
    justify-content: flex-start;
    width: 100%;
    color: #fff;
}
.tabs__line {
    position: absolute;
    bottom: 0;
    height: 4px;
    background-color: rgba(0,0,0,.15);
    transition: .2s ease-in-out;
    border-radius: 4px;
}
</style>