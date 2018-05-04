<template lang="html">
  <div class="lav-select-label" ref="wrap">
    <div class="lav-select-label-wrap">
      <span class="lav-select-wrap">
        <button v-if="showInputButton" class="lav-input" @keydown.down="scrollHandler(true)" @click="startSearching"
          @keydown.up="scrollHandler(false)" @keydown.enter="keyBoardSelectHandler" ref="button">
          <lav-select-multiple-value
            v-if="showMultipleValue" :selected="selected" @remove="removeSelectedItemHandler"
          />
          <span v-if="!selected.length">{{ placeholder }}</span>
          <span v-if="showSingleValue">{{ selected[0].name }}</span>
        </button>
        <input v-if="showInputField" class="lav-input" type="text" v-model="searchString" @click="startSearching"
          @input="searchHandler" @keydown.down="scrollHandler(true)" @keydown.up="scrollHandler(false)"
          @keydown.enter="keyBoardSelectHandler" :placeholder="placeholder" ref="searchInput" />
        <span v-if="showCleaner" class="lav-input-cleaner" @click="clearHandler">
          <lav-icon name="close" :size="9"></lav-icon>
        </span>
      </span>
      <span class="lav-select-after" v-if="after" :style="bgColor" @click="startSearching">
        <lav-icon name="arrow-down" :color="color"></lav-icon>
      </span>
    </div>
    <transition name="fade">
      <div class="lav-select-dropdown" v-show="dropdownVisible" ref="dropdown">
        <div class="lav-select-dropdown-item" v-for="(option, i) in getOptions" :key="option.lavId"
          @click="selectHandler(option, i)" :class="[getActiveOption(option), getHoveredOption(i)]">
          {{ option.name }}
        </div>
        <div v-if="showNoDataOption" class="lav-select-dropdown-item">Ничего не найдено</div>
      </div>
    </transition>
  </div>
</template>

<script>
import colorMixin from '../../mixins/color';

import lavIcon from '../icon';
import lavSelectMultipleValue from './multiple-value-list';


export default {
  name: 'lav-select',
  mixins: [colorMixin],
  components: { lavIcon, lavSelectMultipleValue },
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
    after: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#0286c2'
    },
    target: {
      type: String,
      default: ''
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
    getNumered(options) {
      this.numeredOptions = options.map((item, i) => ({ ...item, lavId: i }));
    },
    inputBlur(e) {
      if(!this.$refs.wrap.contains(e.target)) this.setDropdownState(false);
    },
    setCursor(index) {
      this.cursor = index;
    },
    startSearching(e) {
      this.setSearching(true);
      this.setDropdownState(true);
      this.focusOnInput();
    },
    setSearching(state) {
      this.searching = state;
    },
    focusOnInput() {
      this.$nextTick(() => {
        this.searchable ? this.$refs.searchInput.focus() : this.$refs.button.focus();
      });
    },
    searchHandler() {
      this.filteredOptions = this.numeredOptions.filter(item => {
        return item.name.match(new RegExp(this.searchString, 'ig'))
      });
    },
    selectHandler(item, index) {
      this.clearIfNotMultiple();
      this.addToSelected(item);
      this.multiple ? this.emit(this.selected) : this.emit(this.selected[0]);
      this.setCursor(index);
      this.setSearching(false);
      if(!this.multiple) this.setDropdownState(false);
    },
    keyBoardSelectHandler() {
      this.selectHandler(this.getOptions[this.cursor], this.cursor);
    },
    clearHandler() {
      this.selected = [];
      this.emit(this.selected);
      this.setCursor(0);
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
      this.$nextTick(() => this.dropdownVisible = state);
    },

    removeSelectedItemHandler(index) {
      this.selected.splice(index, 1);
    },


    clearIfNotMultiple() {
      if(!this.multiple) this.selected = [];
    },
    addToSelected(item) {
      if(!this.selected.includes(item)) this.selected.push(item);
    },
    emit(selected) {
      let cloneSelected = JSON.parse(JSON.stringify(selected));
      if(this.target) {
        cloneSelected = (cloneSelected.length) ?
          cloneSelected.map(item => item[this.target]) : cloneSelected[this.target];
      }
      this.$emit('input', cloneSelected);
      this.$emit('select', cloneSelected);
    },

    //dropdown scroll
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
    },


    //options
    getActiveOption(option) {
      return (this.selected.includes(option)) ? 'lav-select-dropdown-item_active' : '';
    },
    getHoveredOption(option) {
      return (this.cursor === option) ? 'lav-select-dropdown-item_hovered' : '';
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
    },
    cursor(n, o) {
      this.scrollDropdown(n, o);
    }
  },
  computed: {
    isFirstOption() {
      return this.cursor > 0;
    },
    isLastOption() {
      return this.cursor < (this.getOptions.length - 1);
    },
    showSingleValue() {
      return !this.multiple && this.selected.length;
    },
    showInputButton() {
      return !this.searching || !this.searchable;
    },
    showInputField() {
      return this.searchable && this.searching;
    },
    showMultipleValue() {
      return this.multiple && this.selected.length;
    },
    showCleaner() {
      return ((this.searchString !== '') || this.selected.length > 0);
    },
    bgColor() {
      return {
        backgroundColor: this.setColorTransparent(this.color, 0.3)
      }
    },

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
