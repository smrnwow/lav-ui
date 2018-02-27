<template lang="html">
  <label class="search-input" ref="wrap">
    <span class="search-input__cleaner" v-if="after" @click="clearInput">
      <svg class="search-input__cleaner-icon" v-if="cleanerVisible" x="0px" y="0px" viewBox="0 0 21.9 21.9">
        <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
        c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4 s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3
        s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7
        s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
      </svg>
      <i v-if="!cleanerVisible" class="fa fa-chevron-down" aria-hidden="true"></i>
    </span>
    <button class="search-input__value" v-show="!searching" type="button" @focus="startSearching">
      {{ selected ? selected.name : placeholder }}
    </button>
    <input class="search-input__value" tabindex v-show="searching" type="text" v-model="searchString" @input="search"
      @keydown.down="scrollDropdown"  @keydown.up="scrollDropdown" @keydown.enter="keyBoardSelect" ref="searchInput" />
    <transition name="fade">
      <div class="search-input__dropdown" v-show="dropdownVisible" ref="dropdown">
        <div v-for="(option, i) in getOptions" :key="option.value" class="search-input__dropdown-item" @click="select(option, i)"
          :class="[getActive(option), getHovered(i)]">
          {{ option.name }}
        </div>
        <div v-if="showNoDataOption" class="search-input__dropdown-item">Ничего не найдено</div>
      </div>
    </transition>
  </label>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Выберите...'
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
    alias: {
      type: Object,
      validator: value => {
        if(!value.hasOwnProperty('name') || !value.hasOwnProperty('value')) {
          throw new SyntaxError('Alias should contains \'name\' and \'value\' properties');
        }
        return value;
      },
      default: () => ({ name: 'name', value: 'value' })
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
      selected: null,
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
      if(this.selected) this.selected = null;
      this.searchAction(this.searchString).then(res => {
        if(res && res.items) {
          this.filteredOptions = res.items.map(item => {
            let option = {};
            for(let prop in this.alias) option[prop] = item[this.alias[prop]];
            return option;
          });
        } else {
          this.filteredOptions = [];
        }
      });
    },
    inputBlur(e) {
      if(!this.$refs.wrap.contains(e.target)) {
        this.stopSearching();
        this.hideDropdown();
      }
    },
    select(item, index) {
      this.$emit('input', item.name);
      this.$emit('select', item);
      this.selected = item;
      this.cursor = index;
      this.hideDropdown();
      this.stopSearching();
    },
    keyBoardSelect() {
      this.select(this.getOptions[this.cursor], this.cursor);
    },
    clearInput() {
      this.$emit('input', '');
      this.searchString = '';
      this.selected = null;
      this.filteredOptions = [];
      this.stopSearching();
      this.hideDropdown();
    },
    startSearching() {
      this.searching = true;
      this.$nextTick(() => {
        this.focusOnInput();
        this.showDropdown();
      });
    },
    stopSearching() {
      this.searching = false;
    },
    scrollDropdown(e) {
      this.$nextTick(() => {
        let list = this.$refs.dropdown, activeItem;
        if(e.keyCode === 40 && this.cursor < this.getOptions.length - 1) {
          this.cursor++;
          activeItem = list.children[this.cursor];
          if(activeItem.offsetTop < list.scrollTop) list.scrollTop = activeItem.offsetTop;
          if((activeItem.offsetTop + activeItem.offsetHeight) >= (list.offsetHeight + list.scrollTop))
            list.scrollTop = (activeItem.offsetTop + activeItem.offsetHeight) - list.offsetHeight;
        } else
        if(e.keyCode === 38 && this.cursor >= 0) {
          this.cursor--;
          activeItem = list.children[this.cursor];
          if(activeItem.offsetTop > (list.scrollTop + list.offsetHeight))
            list.scrollTop = (activeItem.offsetTop + activeItem.offsetHeight) - list.offsetHeight;
          if(activeItem.offsetTop < list.scrollTop) list.scrollTop = activeItem.offsetTop;
        }
      })
    },
    getActive(option) {
      return (this.selected && this.selected.value === option.value) ? 'search-input__dropdown-item_active' : '';
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
      this.$refs.searchInput.focus();
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
      return ((this.searchString !== '') || this.selected);
    }
  }
}
</script>

<style lang="scss">
.search-input {
  position: relative;
  width: 100%;
  &__cleaner {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 38px;
    cursor: pointer;
    z-index: 20;
    right: 0;
    color: #fff;
    background-color: #37ACDF;
    border-radius: 0 3px 3px 0;
    overflow: hidden;
    &-icon {
      height: 16px;
      width: 16px;
      padding: 2px;
      fill: #fff;
    }
  }
  &__value {
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
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(3, 169, 244, 0.25);
    }
  }
  &__dropdown {
    position: absolute;
    overflow-y: auto;
    width: 100%;
    left: 0;
    z-index: 10;
    max-height: 200px;
    &-item {
      background: #fff;
      padding: 10px;
      border-bottom: 1px solid #f5f5f5;
      font-size: 14px;
      cursor: pointer;
      &:hover,
      &_hovered,
      &_active {
        background: #f5f5f5;
        border-bottom: 1px solid #fff;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: .2s ease-in-out;
}
.fade-enter, .fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
