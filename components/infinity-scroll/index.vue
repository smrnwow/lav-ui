<template lang="html">
  <div class="infinity" :id="randomId">
    <transition-group name="fade">
      <div class="up" v-if="arrowsVisible && upVisible" @click="up" :key="1">
        <div class="up__inner">
          <i class="fa fa-chevron-up up__icon" aria-hidden="true"></i>
        </div>
      </div>
      <div class="down" v-if="arrowsVisible && !upVisible && prevPos" @click="down" :key="2">
        <div class="up__inner">
          <i class="fa fa-chevron-down up__icon" aria-hidden="true"></i>
        </div>
      </div>
    </transition-group>
    <div class="w-100">
      <masonry :cols="cols" :gutter="30">
        <component v-for="(item, i) in data" :index="i" :key="i" :is="type" :data="item" @up-visible="emitHandler" />
      </masonry>
      <div v-html="noDataText" v-if="hasNoData"></div>
    </div>
    <loader v-if="displayLoader" :position="calcLoaderPosition" :size="calcLoaderSize" />
  </div>
</template>
<script>
import loader from '@components/loader';
import post from '@components/post';
import channel from '@components/channel';
import favsChannel from '@components/channel/favs-channel.vue';
import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry);
export default {
  components: { post, channel, favsChannel, loader },
  data() {
    return {
      loading: false,
      upVisible: false,
      prevPos: 0,
      arrowsVisible: true,
      perPage: 10,
      offset: 0
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number
    },
    action: {
      type: Function,
    },
    type: {
      type: String,
      default: 'post'
    },
    loaderPosition: {
      type: String,
      default: ''
    },
    loaderSize: {
      type: String,
      default: ''
    },
    cols: {
      type: Object,
      default: () => ({ default: 2 })
    },
    noDataText: {
      type: String,
      default: '<div class="no-data text-muted">Ничего не найдено</div>'
    }
  },
  watch: {
    type() {
      this.handler();
    }
  },
  computed: {
    randomId() {
      return 'infinity-' + ( Math.random() * 1e8 ).toFixed();
    },
    displayLoader() {
      if ( this.loading )
        return true;
      else
        return false;
    },
    hasNoData() {
      return ( this.count === 0 ) && !this.loading;
    },
    hasMore() {
      return this.count > this.data.length;
    },
    calcLoaderPosition() {
      if ( this.loaderPosition ) return this.loaderPosition;
      return ( this.data.length > 0 ) ? 'top' : 'center';
    },
    calcLoaderSize() {
      if ( this.loaderSize === 'full-once' ) {
        return ( this.offset > 0 ) ? '' : 'full';
      } else {
        return this.loaderSize;
      }
    }
  },
  methods: {
    infinity() {
      let diff = document.getElementById( this.randomId ).getBoundingClientRect().height - window.innerHeight;
      this.upVisible = ( window.scrollY > ( window.innerHeight / 2 ) ) ? true : false;
      if ( window.scrollY >= ( diff - 200 ) && !this.loading && this.hasMore ) this.handler();
    },
    handler( filter = {} ) {
      // console.log({ limit: this.perPage, offset: this.offset, ...filter });
      if ( !this.loading ) {
        this.loading = true;
        this.action( { limit: this.perPage, offset: this.offset, ...filter } ).then( res => {
          this.incrementOffset();
          this.loading = false;
        } );
      }
    },
    incrementOffset() {
      this.offset = this.offset + this.perPage;
    },
    resetOffset() {
      this.offset = 0;
    },
    up() {
      this.prevPos = window.scrollY;
      window.scrollTo( 0, 0 );
    },
    down() {
      if ( this.prevPos !== 0 ) window.scrollTo( 0, this.prevPos );
      this.prevPos = 0;
    },
    emitHandler( payload ) {
      this.arrowsVisible = payload;
    }
  },
  mounted() {
    this.handler();
    this.$root.$on( 'up-visible', this.emitHandler );
    window.addEventListener( 'scroll', this.infinity );
  },
  beforeDestroy() {
    window.removeEventListener( 'scroll', this.infinity );
  }
}
</script>