<template lang="html">
  <label class="lav-label" ref="wrap">
    <span class="lav-input-wrap">
      <button v-if="!searching || !searchable" class="lav-input" ref="button" @click="startSearching"
        @keydown.down="scrollDropdown" @keydown.up="scrollDropdown" @keydown.enter="keyBoardSelect">
        <span v-if="multiple && selected.length" class="lav-select-selected-wrap">
          <span class="lav-select-selected" v-for="(item, i) in selected" @click.stop="removeSelected(i)" :key="item.name">
            {{ item.name }}
            <span class="lav-select-selected-remove">
              <lav-icon name="close" :size="7" color="#fff" />
            </span>
          </span>
        </span>
        <span v-if="!selected.length">{{ placeholder }}</span>
        <span v-if="!multiple && selected.length">{{ selected[0].name }}</span>
      </button>
      <input v-if="searchable && searching" class="lav-input" tabindex type="text" v-model="searchString" @input="search" placeholder="Поиск"
        @keydown.down="scrollDropdown" @keydown.up="scrollDropdown" @keydown.enter="keyBoardSelect" ref="searchInput" />
      <span v-if="cleanerVisible" class="lav-input-cleaner" @click="clearInput">
        <lav-icon name="close" :size="9"></lav-icon>
      </span>
    </span>
    <span class="lav-input-after">
      <lav-icon name="arrow-down"></lav-icon>
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
import lavIcon from '../icon';
export default {
  components: { lavIcon },
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
      if(this.multiple) {
        this.$emit('input', this.selected);
        this.$emit('select', this.selected);
      } else {
        this.$emit('input', this.selected[0]);
        this.$emit('select', this.selected[0]);
      }
      this.setCursor(index);
      this.stopSearching();
    },
    keyBoardSelect() {
      this.select(this.getOptions[this.cursor], this.cursor);
    },
    clearInput() {
      this.selected = [];
      this.$emit('input', this.selected);
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