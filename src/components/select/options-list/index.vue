<template lang="html">
  <div class="lav-select-dropdown" ref="dropdown">
    <lav-select-options-item  v-for="(option, i) in options" :data="option" :index="i" :key="option.lavId"
      @select="selectHandler" />
    <div v-if="!options.length" class="lav-select-dropdown-item">Ничего не найдено</div>
  </div>
</template>

<script>
import lavSelectOptionsItem from '../options-item';

export default {
  name: 'lav-select-options-list',
  components: { lavSelectOptionsItem },
  props: {
    options: Array,
    cursor: Number,
    selected: Array
  },
  methods: {
    selectHandler(data, index) {
      this.$emit('select', data, index);
    },
    scrollDropdown(newCursor, oldCursor) {
      if((newCursor > oldCursor) && (newCursor <= (this.options.length - 1))) {
        this.toBottom(this.$refs.dropdown, newCursor);
      } else if((newCursor < oldCursor) && (newCursor >= 0)) {
        this.toTop(this.$refs.dropdown, newCursor);
      }
    },
    toBottom(list, cursor) {
      let activeItem = list.children[cursor];
      let escapeTop = activeItem.offsetTop < list.scrollTop;
      let escapeBottom = (activeItem.offsetTop + activeItem.offsetHeight) >= (list.offsetHeight + list.scrollTop);
      if(escapeTop) list.scrollTop = activeItem.offsetTop;
      if(escapeBottom) list.scrollTop = (activeItem.offsetTop + activeItem.offsetHeight) - list.offsetHeight;
    },
    toTop(list, cursor) {
      let activeItem = list.children[cursor];
      let escapeBottom = activeItem.offsetTop > (list.scrollTop + list.offsetHeight);
      let escapeTop = (activeItem.offsetTop - activeItem.offsetHeight) < list.scrollTop;
      if(escapeBottom) list.scrollTop = (activeItem.offsetTop + activeItem.offsetHeight) - list.offsetHeight;
      if(escapeTop) list.scrollTop = activeItem.offsetTop;
    }
  },
  computed: {
    isFirstOption() {
      return this.cursor > 0;
    },
    isLastOption() {
      return this.cursor < (this.getOptions.length - 1);
    }
  },
  watch: {
    cursor(newCursor, oldCursor) {
      this.scrollDropdown(newCursor, oldCursor);
    }
  }
}
</script>

<style lang="css">
</style>
