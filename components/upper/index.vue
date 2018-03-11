<template>
  <transition name="fade">
    <button class="lav-upper" v-show="show" @click="handleClick">
      <svg class="lav-icon" x="0px" y="0px" viewBox="0 0 284.929 284.929" :style="style">
        <path d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
          C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
          c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
          c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
          C284.929,199.378,283.984,197.188,282.082,195.285z"/>
      </svg>
    </button>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: 0,
      lastPosition: 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
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
    style() {
      return {
        transform: `rotate(${this.lastPosition ? '180deg' : '0deg'})`
      }
    }
  }
}
</script>
<style>
.lav-upper {
  display: inline-block;
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 2px 7px rgba(0,0,0,.1);
  padding: 15px;
  line-height: 1;
  cursor: pointer;
  outline: none;
}
.lav-upper svg {
  height: 20px;
  width: 20px;
  transition: .2s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: .2s ease-in-out;
}
.fade-enter, .fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>

