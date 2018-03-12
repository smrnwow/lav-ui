<template lang="html">
  <div class="pagination">
    <div v-show="!loading" class="w-100">
      <div v-html="noDataText" v-if="hasNoData"></div>
    </div>
    <!-- <loader v-show="loading" position="center" size="full" /> -->
    <div class="pagination__steps">
      <button v-if="hasPrev" class="btn btn-primary btn-sm" @click="prevPage">
        <i class="fa fa-angle-left"></i>
      </button>
      <button v-if="hasFirst" class="btn btn-primary btn-sm font-weight-semibold" :class="[getClass(1)]" @click="changePage(1)">1</button>
      <span v-if="hasFirst">...</span>
      <button class="btn btn-primary btn-sm font-weight-semibold" :class="[getClass(page)]" v-for="page in pages" @click="changePage(page)">
        {{ page }}
      </button>
      <span v-if="hasLast">...</span>
      <button v-if="hasLast" class="btn btn-primary btn-sm font-weight-semibold" :class="[getClass(totalPages)]" @click="changePage(totalPages)">
        {{ totalPages }}
      </button>
      <button v-if="hasNext" class="btn btn-primary btn-sm" @click="nextPage">
        <i class="fa fa-angle-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      perPage: 10,
      range: 2,
      current: 1
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
    noDataText: {
      type: String,
      default: '<div class="no-data text-muted">Ничего не найдено</div>'
    }
  },
  computed: {
    pages() {
      let pages = [];
      for(let i = this.start; i <= this.end; i++) pages.push(i);
      return pages;
    },
    start() {
      let start = this.current - this.range;
      return (start > 0) ? start : 1;
    },
    end() {
      let end = this.current + this.range;
      return (end < this.totalPages) ? end : this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.count / this.perPage);
    },
    hasNext() {
      return this.current < this.totalPages;
    },
    hasPrev() {
      return this.current > 1;
    },
    hasNoData() {
      return ( this.count === 0 ) && !this.loading;
    },
    load() {
      return this.loading;
    },
    hasFirst() {
      return this.start > 3;
    },
    hasLast() {
      return this.end !== this.totalPages;
    }
  },
  watch: {
    data(n) {
      this.loading = false;
    },
    current(n) {
      window.scroll(0, 0);
      window.localStorage.setItem('pgnActive', n);
    }
  },
  methods: {
    getClass(page) {
      return (page === this.current) ? 'btn-primary' : 'btn-outline-primary';
    },
    prevPage() {
      this.current--;
      this.$emit('load', { limit: this.perPage, offset: this.offset });
    },
    nextPage() {
      this.current++;
      this.$emit('load', { limit: this.perPage, offset: this.offset });
    },
    changePage(page) {
      if(this.current !== page) {
        this.current = page;
        this.$emit('load', { limit: this.perPage, offset: this.offset });
      }
    },
    reset() {
      this.current = 1;
    },
    offset() {
      return (this.current * this.perPage - this.perPage);
    }
  },
  created() {
    this.current = window.localStorage.getItem('pgnActive') ? parseInt(window.localStorage.getItem('pgnActive')) : 1;
  },
  mounted() {
    this.$emit('load', { offset: this.offset, limit: this.perPage });
  }
}
</script>
<style lang="css">
.pagination {
  display: flex;
  flex-direction: column;
}
.pagination__steps {
  display: flex;
  justify-content: center;
  padding: 15px 0;
}
.pagination__steps button {
  margin: 0 4px;
}
.pagination__steps button:focus {
  box-shadow: 0 0 0 0.2rem rgba(3, 169, 244, 0);
}
</style>