<template>
  <div class="lav-scrolling" ref="wrap">
    <div class="lav-scrolling-inner" ref="scrolling">
      <div class="lav-scrolling-arrow lav-scrolling-prev">
        <svg x="0px" y="0px" viewBox="0 0 284.935 284.936">
          <path d="M110.488,142.468L222.694,30.264c1.902-1.903,2.854-4.093,2.854-6.567c0-2.474-0.951-4.664-2.854-6.563L208.417,2.857
            C206.513,0.955,204.324,0,201.856,0c-2.475,0-4.664,0.955-6.567,2.857L62.24,135.9c-1.903,1.903-2.852,4.093-2.852,6.567
            c0,2.475,0.949,4.664,2.852,6.567l133.042,133.043c1.906,1.906,4.097,2.857,6.571,2.857c2.471,0,4.66-0.951,6.563-2.857
            l14.277-14.267c1.902-1.903,2.851-4.094,2.851-6.57c0-2.472-0.948-4.661-2.851-6.564L110.488,142.468z"/>
        </svg>
      </div>
      <slot></slot>
      <div class="lav-scrolling-arrow lav-scrolling-next">
        <svg x="0px" y="0px" viewBox="0 0 284.935 284.936">
          <path d="M222.701,135.9L89.652,2.857C87.748,0.955,85.557,0,83.084,0c-2.474,0-4.664,0.955-6.567,2.857L62.244,17.133
            c-1.906,1.903-2.855,4.089-2.855,6.567c0,2.478,0.949,4.664,2.855,6.567l112.204,112.204L62.244,254.677
            c-1.906,1.903-2.855,4.093-2.855,6.564c0,2.477,0.949,4.667,2.855,6.57l14.274,14.271c1.903,1.905,4.093,2.854,6.567,2.854
            c2.473,0,4.663-0.951,6.567-2.854l133.042-133.044c1.902-1.902,2.854-4.093,2.854-6.567S224.603,137.807,222.701,135.9z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$refs.wrap.getBoundingClientRect().width > this.$refs.scrolling.getBoundingClientRect().width);
  }
}
</script>

<style>
.lav-scrolling {
  position: relative;
  height: 100%;
  width: 100%;
  white-space: nowrap;
}
.lav-scrolling-inner {
  display: inline-block;
  height: 100%;
}
.lav-scrolling-arrow {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  cursor: pointer;
  width: 30px;
  height: 100%;
  background-color: rgba(0,0,0,.5);
  z-index: 100;
}
.lav-scrolling-arrow svg {
  height: 20px;
  width: 20px;
  fill: #fff;
}
.lav-scrolling-prev {
  left: 0;
}
.lav-scrolling-next {
  right: 0;
}
</style>
