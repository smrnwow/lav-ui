<template>
  <transition name="lav-slide-up">
    <button class="lav-upper" v-show="show" @click="handleClick">
      <lav-icon :name="icon"></lav-icon>
    </button>
  </transition>
</template>

<script>
import lavIcon from '../icon';
export default {
  components: { lavIcon },
  data() {
    return {
      scrollPosition: 0,
      lastPosition: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY;
      if((window.scrollY > 100) && this.lastPosition > 0) {
        this.lastPosition = 0;
      }
    },
    handleClick(e) {
      this.$emit('click', e);
      if(this.lastPosition === 0) {
        this.lastPosition = this.scrollPosition;
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, this.lastPosition);
        this.lastPosition = 0;
      }
    }
  },
  computed: {
    show() {
      return (this.scrollPosition > (window.innerHeight * 2)) || this.lastPosition;
    },
    icon() {
      return this.lastPosition ? 'arrow-down' : 'arrow-up';
    }
  }
}
</script>
