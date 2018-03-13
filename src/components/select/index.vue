<template lang="html">
  <label class="lav-label" ref="wrap">
    <span class="lav-input-wrap">
      <span v-if="multiple && selected.length" class="lav-select-selected-wrap">
        <span class="lav-select-selected" v-for="(item, i) in selected" @click.stop="removeSelected(i)" :key="item.name">
          {{ item.name }}
          <span class="lav-select-selected-remove">
            <svg class="lav-select-selected-icon" x="0px" y="0px" viewBox="0 0 21.9 21.9">
              <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
              c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3
              s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7
              s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
            </svg>
          </span>
        </span>
      </span>
      <button v-if="!searching || !searchable" class="lav-input" ref="button" @click="startSearching"
        @keydown.down="scrollDropdown" @keydown.up="scrollDropdown" @keydown.enter="keyBoardSelect">
        <span v-if="!selected.length">{{ placeholder }}</span>
        <span v-if="!multiple && selected.length">{{ selected[0].name }}</span>
      </button>
      <input v-if="searchable && searching" class="lav-input" tabindex type="text" v-model="searchString" @input="search" placeholder="Поиск"
        @keydown.down="scrollDropdown" @keydown.up="scrollDropdown" @keydown.enter="keyBoardSelect" ref="searchInput" />
      <span v-if="cleanerVisible" class="lav-input-cleaner" @click="clearInput">
        <svg class="lav-icon" x="0px" y="0px" viewBox="0 0 21.9 21.9">
          <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
          c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
        </svg>
      </span>
    </span>
    <span class="lav-input-after">
      <svg class="lav-icon" :class="{ 'lav-icon-rotate': dropdownVisible }" x="0px" y="0px" viewBox="0 0 300 300">
        <path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441
          L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082
          c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647
          c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z"/>
      </svg>
    </span>
    <transition name="fade">
      <div v-show="dropdownVisible" class="lav-select-dropdown" ref="dropdown">
        <div v-for="(option, i) in getOptions" :key="option.value" class="lav-select-dropdown-item" @click="select(option, i)"
          :class="[getActive(option), getHovered(i)]" @mouseenter="setCursor(i)">
          {{ option.name }}
        </div>
        <div v-if="showNoDataOption" class="lav-select-dropdown-item">Ничего не найдено</div>
      </div>
    </transition>
  </label>
</template>

<script>
export default {
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
      default: () => ([]),
      validator: value => {
        if(value.length === 0) return value;
        value.forEach(prop => {
          if(!prop.hasOwnProperty('name') || !prop.hasOwnProperty('value'))
            throw new SyntaxError('Options should contains \'name\' and \'value\' properties');
        })
        return value;
      }
    },
    searchAction: {
      type: Function
    },
    after: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      searching: false,
      searchString: '',
      selected: [],
      dropdownVisible: false,
      cursor: -1,
      filteredOptions: []
    }
  },
  mounted() {
    window.addEventListener('click', this.inputBlur);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.inputBlur);
  },
  methods: {
    search(e) {
      if(this.searchAction) {
        this.searchAction(this.searchString).then(res => {
          this.filteredOptions = (res && res.items) ? res.items : [];
        });
      } else {
        this.filteredOptions = this.options.filter(item => {
          return item.name.match(new RegExp(this.searchString, 'ig'))
        })
      }
    },
    inputBlur(e) {
      if(!this.$refs.wrap.contains(e.target)) this.stopSearching();
    },
    setCursor(index) {
      this.cursor = index;
    },
    select(item, index) {
      if(!this.multiple) this.selected = [];
      if(!this.selected.includes(item)) this.selected.push(item);
      this.$emit('select', this.selected);
      this.setCursor(index);
      this.stopSearching();
    },
    keyBoardSelect() {
      this.select(this.getOptions[this.cursor], this.cursor);
    },
    clearInput() {
      this.selected = [];
      this.$emit('select', this.selected);
      this.setCursor(0);
      this.searchString = '';
      this.filteredOptions = [];
    },
    startSearching() {
      this.searching = true;
      this.showDropdown();
      this.$nextTick(() => this.focusOnInput());
    },
    stopSearching() {
      this.searching = false;
      this.$nextTick(() => this.hideDropdown());
    },
    scrollDropdown(e) {
      if(e.keyCode === 40 && this.cursor < this.getOptions.length - 1)
        this.toBottom(this.$refs.dropdown);
      else if(e.keyCode === 38 && this.cursor > 0)
        this.toTop(this.$refs.dropdown);
    },
    getActive(option) {
      return (this.selected.length && this.selected.includes(option)) ? 'lav-select-dropdown-item_active' : '';
    },
    getHovered(option) {
      return (this.cursor === option) ? 'lav-select-dropdown-item_hovered' : '';
    },
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    focusOnInput() {
      this.searchable ? this.$refs.searchInput.focus() : this.$refs.button.focus();
    },
    toBottom(list) {
      this.cursor++;
      let activeItem = list.children[this.cursor];
      let escapeTop = activeItem.offsetTop < list.scrollTop;
      let escapeBottom = (activeItem.offsetTop + activeItem.offsetHeight) >= (list.offsetHeight + list.scrollTop);
      if(escapeTop) list.scrollTop = activeItem.offsetTop;
      if(escapeBottom) list.scrollTop = activeItem.offsetTop - list.offsetHeight;
    },
    toTop(list) {
      this.cursor--;
      let activeItem = list.children[this.cursor];
      let escapeBottom = activeItem.offsetTop > (list.scrollTop + list.offsetHeight);
      let escapeTop = (activeItem.offsetTop - activeItem.offsetHeight) < list.scrollTop;
      if(escapeBottom) list.scrollTop = (activeItem.offsetTop + activeItem.offsetHeight) - list.offsetHeight;
      if(escapeTop) list.scrollTop = (activeItem.offsetTop - activeItem.offsetHeight);
    },
    removeSelected(index) {
      this.selected.splice(index, 1);
    }
  },
  watch: {
    getOptions(n) {
      let entry = 0;
      n.forEach((prop, i) => {
        if(prop.value === this.cursor) {
          return entry = (i + 1);
        }
      })
      this.cursor = entry;
    },
    searchString(n) {
      this.$emit('input', n);
    }
  },
  computed: {
    getOptions() {
      return (this.searchString) ? this.filteredOptions : this.options;
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