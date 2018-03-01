<template lang="html">
  <button class="bf" @click="handler">
    <span v-if="!loading"><slot></slot></span>
    <svg class="ska" v-if="loading" viewBox='0 0 150 50'>
      <rect x='0' y='0' height='50' width='150' fill='none' stroke='#fff' stroke-width='5' stroke-linecap='round'
        stroke-dasharray='50 350' stroke-dashoffset='0'>
      </rect>
    </svg>
  </button>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'button'
    }
  },
  methods: {
    handler(e) {
      this.$emit('click', e);
      // this.loading = !this.loading;
    }
  }
}
</script>
<style lang="css">

.bf {
  position: relative;
  height: 50px;
  width: 150px;
  background: rgb(2, 134, 194);
  border: none;
  padding: 0;
  outline: none;
  color: #fff;
}
.ska {
  position: absolute;
  top: 0;
  left: 0;
}
.ska rect {
  animation: zalupa 1.5s infinite linear;
}

@keyframes zalupa {
  to {
    stroke-dashoffset: -400;
  }
}
</style>
