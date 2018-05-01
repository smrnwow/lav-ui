<template lang="html">
  <div class="scroll" ref="scroll">
    <!-- @mousedown="scroll('backward', true)" @mouseup="scroll('backward', false)" -->
    <div class="scroll-arrow scroll-arrow-back" @click="backwardHandler">
      <lav-icon name="arrow-left" color="#fff"></lav-icon>
    </div>
    <div class="scroll-wrap" :style="wrapStyles" ref="wrap" @dragstart="dragStartHandler" @dragend="dragEndHandler">
      <slot></slot>
    </div>
    <!-- @mousedown="scroll('forward', true)" @mouseup="scroll('forward', false)" -->
    <div class="scroll-arrow scroll-arrow-forward" @click="forwardHandler">
      <lav-icon name="arrow-right" color="#fff"></lav-icon>
    </div>
  </div>
</template>

<script>
import lavIcon from '../icon';
export default {
  components: { lavIcon },
  data() {
    return {
      startPosition: 0,
      wrapWidth: 0,
      scrollWidth: 0,
      childs: 0,
      transform: 0
    }
  },
  props: {
    scrollSpeed: {
      type: Number,
      default: 150
    },
    smooth: {
      type: Boolean,
      default: false
    },
    active: Number
  },
  mounted() {
    this.scrollWidth = this.$refs.scroll.getBoundingClientRect().width;
    setTimeout(() => {
      this.wrapWidth = this.$refs.wrap.getBoundingClientRect().width;
      this.childs = this.$slots.default.length;
    }, 0);
  },
  methods: {
    backwardHandler() {
      this.prev();
    },
    forwardHandler() {
      this.next();
    },
    next() {
      if((-1 * (this.transform - this.eachChildWidth)) <= (this.wrapWidth - this.scrollWidth)) {
        this.transform = this.transform - this.eachChildWidth;
      }
    },
    prev() {
      if((this.transform + this.eachChildWidth) <= 0) {
        this.transform = this.transform + this.eachChildWidth;
      }
    },
    dragStartHandler(e) {
      this.startPosition = e.offsetX;
    },
    dragEndHandler(e) {

      // this.transform = e.offsetX;
    },
    dragHandler(e) {
      this.transform = e.offsetX;
    },
    scroll(direction, flag) {
      const isForward = (direction === 'forward');
      const scrollWidth = this.$refs.scroll.getBoundingClientRect().width,
            wrapWidth = this.$refs.wrap.getBoundingClientRect().width;
      if(flag) {
        if(this.timer) clearInterval(this.timer);
        this.offset(isForward, scrollWidth, wrapWidth);
        this.timer = setInterval(() => {
          this.offset(isForward, scrollWidth, wrapWidth);
        }, 100);
      } else {
        clearInterval(this.timer);
      }
    },
    offset(isForward, scrollWidth, wrapWidth) {
      this.transform = isForward ? (this.transform - this.scrollSpeed) : (this.transform + this.scrollSpeed);
      if(isForward && (scrollWidth + (this.transform * (-1)) > wrapWidth)) {
        this.transform = -(wrapWidth - scrollWidth);
        return false;
      } else if(!isForward && (this.transform > 0)) {
        this.transform = 0;
        return false;
      }
    }
  },
  computed: {
    isScrollable() {
      return this.scrollWidth > this.wrapWidth;
    },
    isScrollableBackward() {
      return this.isScrollable && this.transform < 0;
    },
    isScrollableForward() {
      return this.isScrollable && this.transform < this.wrapWidth;
    },
    wrapStyles() {
      return {
        transform: 'translateX(' + this.transform + 'px)'
      }
    }
  },
  watch: {
    wrapWidth(width) {
      this.eachChildWidth = (width / this.childs);
    }
  }
}
</script>

<style lang="css">
.scroll {
  position: relative;
  width: 100%;
  text-align: center;
  overflow: hidden;
  height: 100%;
}
.scroll-arrow {
  position: absolute;
  height: 100%;
  width: 20px;
  background: rgba(0,0,0,.6);
  color: #fff;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  z-index: 100;
  user-select: none;
  cursor: pointer;
}
.scroll-arrow-back {
  left: 0;
}
.scroll-arrow-forward {
  right: 0;
}
.scroll-wrap {
  display: inline-block;
  height: 100%;
  white-space: nowrap;
  transition: .2s ease-in-out;
}
.scroll-item {
  height: 100%;
  width: 150px;
  border: 1px solid #fff;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: .2s ease-in-out;
  background-color: #fafafa;
}
.scroll-item-big {
  width: 230px;
}
.scroll-item-active {
  background: #999;
}
</style>
