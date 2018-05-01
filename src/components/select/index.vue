<template lang="html">
  <label class="lav-select-label" ref="wrap">
    <lav-select-input :selected="selected" :searchable="searchable" :multiple="multiple" :placeholder="placeholder"
      :after="after" :color="color" :searching="searching" @remove="removeSelectedHandler" @clear="clearHandler" @dropdown="setDropdownState" @search="searchHandler" @scroll="scrollHandler" @select="keyBoardSelectHandler" @searching="startSearchingHandler" />
    <transition name="fade">
      <lav-select-options-list v-show="dropdownVisible" :options="getOptions" :cursor="cursor" :selected="selected"
        @select="selectHandler" />
    </transition>
  </label>
</template>

<script>
import lavSelectInput from './input';
import lavSelectOptionsList from './options-list';

export default {
  name: 'lav-select',
  components: { lavSelectInput, lavSelectOptionsList },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Выберите...'
    },
    searchable: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => ([])
    },
    searchAction: {
      type: Function
    },
    after: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#0286c2'
    }
  },
  data() {
    return {
      searching: false,
      searchString: '',
      selected: [],
      dropdownVisible: false,
      cursor: 0,
      filteredOptions: [],
      numeredOptions: []
    }
  },
  provide() {
    return {
      selected: this.selected
    }
  },
  created() {
    this.getNumered(this.options);
  },
  mounted() {
    window.addEventListener('click', this.inputBlur);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.inputBlur);
  },
  methods: {
    searchHandler(e) {
      this.searchString = e;
      this.filteredOptions = this.getOptions.filter(item => {
        return item.name.match(new RegExp(this.searchString, 'ig'))
      });
    },
    inputBlur(e) {
      if(!this.$refs.wrap.contains(e.target)) this.setDropdownState(false);
    },
    setCursor(index) {
      this.cursor = index;
    },
    selectHandler(item, index) {
      if(!this.multiple) this.selected = [];
      if(!this.selected.includes(item)) this.selected.push(item);

      if(this.multiple) {
        this.$emit('input', this.selected);
        this.$emit('select', this.selected);
      } else {
        this.$emit('input', this.selected[0]);
        this.$emit('select', this.selected[0]);
      }
      this.setCursor(index);
      if(!this.multiple) {
        this.searching = false;
        this.setDropdownState(false);
      }
    },
    startSearchingHandler() {
      this.searching = true;
      this.setDropdownState(true);
    },
    keyBoardSelectHandler() {
      this.selectHandler(this.getOptions[this.cursor], this.cursor);
    },
    clearHandler() {
      this.selected = [];
      this.$emit('input', this.selected);
      this.$emit('select', this.selected);
      this.setCursor(0, 'clear');
      this.searchString = '';
      this.filteredOptions = [];
    },
    scrollHandler(state) {
      if(state && (this.cursor < this.getOptions.length - 1)) {
        return this.cursor++;
      } else if(!state && (this.cursor > 0)) {
        return this.cursor--;
      }
    },
    setDropdownState(state) {
      this.$nextTick(() => {
        this.dropdownVisible = state;
      })
    },
    removeSelectedHandler(index) {
      this.selected.splice(index, 1);
    },
    getNumered(options) {
      this.numeredOptions = options.map((item, i) => ({ ...item, lavId: i }));
    }
  },
  watch: {
    options(n) {
      this.getNumered(n);
    },
    getOptions(n) {
      let entry = 0;
      n.forEach((prop, i) => {
        if(prop.lavId === this.cursor) {
          return entry = i;
        }
      });
      this.setCursor(entry);
    }
  },
  computed: {
    getOptions() {
      return (this.searchString) ? this.filteredOptions : this.numeredOptions;
    },
    showNoDataOption() {
      return (!this.filteredOptions.length && this.searchString.length > 0);
    },
    cleanerVisible() {
      return ((this.searchString !== '') || this.selected.length > 0);
    }
  }
}
</script>
