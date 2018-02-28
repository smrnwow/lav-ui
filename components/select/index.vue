<template lang="html">
  <label class="search-input" ref="wrap">
    <button class="search-input__value" type="button" @focus="startSearching">
      <span v-if="!selected.length">{{ placeholder }}</span>
      <span v-if="!multiply && selected.length">{{ selected[0] }}</span>
      <span v-if="multiply && selected.length">
        <small class="search-input__selected" v-for="(item, i) in selected" @click.stop="removeSelected(i)" :key="i">
          {{ item }}
          <span class="search-input__selected-remove">
            <svg class="search-input__selected-icon" x="0px" y="0px" viewBox="0 0 21.9 21.9">
              <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
              c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3
              s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7
              s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
            </svg>
          </span>
        </small>
      </span>
    </button>
    <span class="search-input__cleaner" v-if="after" @click="clearInput">
      <svg class="search-input__cleaner-icon" v-if="cleanerVisible" x="0px" y="0px" viewBox="0 0 21.9 21.9">
        <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
        c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3
        s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7
        s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
      </svg>
      <i v-if="!cleanerVisible" class="fa fa-chevron-down" aria-hidden="true"></i>
    </span>
    <transition name="fade">
      <div class="search-input__dropdown" v-show="dropdownVisible">
        <div class="search-input__search" v-if="searchable">
          <input class="search-input__search-field" tabindex type="text" v-model="searchString" @input="search" placeholder="Поиск"
            @keydown.down="scrollDropdown" @keydown.up="scrollDropdown" @keydown.enter="keyBoardSelect" ref="searchInput" />
        </div>
        <div class="search-input__dropdown-list" ref="dropdown">
          <div v-for="(option, i) in getOptions" :key="option.value" class="search-input__dropdown-item" @click="select(option, i)"
            :class="[getActive(option), getHovered(i)]" @mouseenter="setCursor(i)">
            {{ option.name }}
          </div>
          <div v-if="showNoDataOption" class="search-input__dropdown-item">Ничего не найдено</div>
        </div>
      </div>
    </transition>
  </label>
</template>

<script>
export default {
  props: {
    multiply: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Выберите...'
    },
    searchable: {
      type: Boolean,
      default: true
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
      this.searchAction(this.searchString).then(res => {
        this.filteredOptions = (res && res.items) ? res.items : [];
      });
    },
    inputBlur(e) {
      if(!this.$refs.wrap.contains(e.target)) this.stopSearching();
    },
    setCursor(index) {
      this.cursor = index;
    },
    select(item, index) {
      if(!this.multiply) this.selected = [];
      this.selected.push(item.name);
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
      this.showDropdown();
      this.$nextTick(() => this.focusOnInput());
    },
    stopSearching() {
      this.$nextTick(() => this.hideDropdown());
    },
    scrollDropdown(e) {
      if(e.keyCode === 40 && this.cursor < this.getOptions.length - 1)
        this.toBottom(this.$refs.dropdown);
      else if(e.keyCode === 38 && this.cursor >= 0)
        this.toTop(this.$refs.dropdown);
    },
    getActive(option) {
      return (this.selected.length && this.selected.includes(option.name)) ? 'search-input__dropdown-item_active' : '';
    },
    getHovered(option) {
      return (this.cursor === option) ? 'search-input__dropdown-item_hovered' : '';
    },
    showDropdown() {
      this.dropdownVisible = true;
    },
    hideDropdown() {
      this.dropdownVisible = false;
    },
    focusOnInput() {
      if(this.searchable) this.$refs.searchInput.focus();
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

<style lang="css">
.search-input {
  position: relative;
  width: 100%;
}
.search-input__cleaner {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 38px;
  cursor: pointer;
  z-index: 20;
  top: 0;
  right: 0;
  color: #fff;
  background-color: #37ACDF;
  border-radius: 0 3px 3px 0;
  overflow: hidden;
}
.search-input__cleaner-icon {
  height: 16px;
  width: 16px;
  padding: 2px;
  fill: #fff;
}
.search-input__value {
  background-color: #fff;
  text-align: left;
  display: block;
  outline: none;
  width: 100%;
  font-size: 14px;
  padding: 0.375rem 2.975rem 0.375rem 0.75rem;
  color: #BFBFBF;
  border: 2px solid #E0E0E0;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.search-input__search {
  position: relative;
  box-shadow: 0 1px 3px rgba(0,0,0, .1);
}
.search-input__search-field {
  width: 100%;
  border: none;
  padding: 0.375rem 2.975rem 0.375rem 0.75rem;
  outline: none;
}
.search-input__search-field::placeholder {
  font-size: 14px;
}
.search-input__search-field:focus {
  box-shadow: 0;
}
.search-input__selected {
  position: relative;
  z-index: 100;
  background: rgba(0,0,0,.5);
  border-radius: 5px;
  padding: 3px;
  margin: 0 3px 5px 0;
  font-size: 11px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}
.search-input__selected-remove {
  height: 10px;
  width: 10px;
}
.search-input__selected-icon {
  fill: #fff;
  width: 10px;
  height: 10px;
}
.search-input__dropdown {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 10;
}
.search-input__dropdown-list {
  width: 100%;
  overflow-y: auto;
  max-height: 200px;
}
.search-input__dropdown-item {
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
  cursor: pointer;
}
.search-input__dropdown-item_hovered {
  background: #f5f5f5;
  border-bottom: 1px solid #fff;
}
.search-input__dropdown-item_active {
  background: #f5f5f5;
  border-bottom: 1px solid #fff;
  font-weight: bold;
}


/* .fade-enter-active, .fade-leave-active {
  transition: .2s ease-in-out;
}
.fade-enter, .fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
} */
</style>
