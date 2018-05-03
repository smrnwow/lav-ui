<template>
  <div class="lav-select-label-wrap" @click="startSearching">
    <span class="lav-select-wrap">
      <button v-if="showInputButton" class="lav-input" @keydown.down="$emit('scroll', true)"
        @keydown.up="$emit('scroll', false)" @keydown.enter="selectHandler" ref="button">
        <lav-select-multiple-value v-if="showMultipleValue" :selected="selected" @remove="removeSelectedItemHandler" />
        <span v-if="!selected.length">{{ placeholder }}</span>
        <span v-if="showSingleValue">{{ selected[0].name }}</span>
      </button>
      <input v-if="showInputField" class="lav-input" type="text" v-model="searchString" @input="searchHandler"
        @keydown.down="$emit('scroll', true)" @keydown.up="$emit('scroll', false)" @keydown.enter="$emit('select')" :placeholder="placeholder" ref="searchInput" />
      <span v-if="showCleaner" class="lav-input-cleaner" @click="clearHandler">
        <lav-icon name="close" :size="9"></lav-icon>
      </span>
    </span>
    <span class="lav-select-after" v-if="after" :style="bgColor">
      <lav-icon name="arrow-down" :color="color"></lav-icon>
    </span>
  </div>
</template>

<script>
import colorMixin from '../../../mixins/color';

import lavIcon from '../../icon';
import lavSelectMultipleValue from '../multiple-value-list';

export default {
  name: 'lav-select-input',
  mixins: [colorMixin],
  components: { lavIcon, lavSelectMultipleValue },
  props: {
    selected: Array,
    searchable: Boolean,
    multiple: Boolean,
    placeholder: String,
    after: Boolean,
    color: String
  },
  data() {
    return {
      searchString: ''
    }
  },
  methods: {
    selectHandler() {
      this.$emit('select');
    },
    removeSelectedItemHandler(index) {
      this.$emit('remove', index);
    },
    clearHandler() {
      this.$emit('clear');
    },
    searchHandler() {
      this.$emit('search', this.searchString);
    },
    focusOnInput() {
      this.$nextTick(() => {
        this.searchable ? this.$refs.searchInput.focus() : this.$refs.button.focus();
      });
    },
    startSearching(e) {
      this.setSearching(true);
      this.setDropdownState(true);
      this.focusOnInput();
    },
    setSearching(state) {
      this.$parent.searching = state;
    },
    setDropdownState(state) {
      console.log(state, 'called input');
      this.$emit('dropdown', state);
    },
  },
  computed: {
    showSingleValue() {
      return !this.multiple && this.selected.length;
    },
    showInputButton() {
      return !this.$parent.searching || !this.searchable;
    },
    showInputField() {
      return this.searchable && this.$parent.searching;
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
    }
  }
}
</script>
