<template lang="html">
  <span class="lav-input-wrap">
    <button v-if="showButton" class="lav-input" ref="button" @click="buttonClickHandler"
      @keydown.down="scrollDropdown" @keydown.up="scrollDropdown" @keydown.enter="keyBoardSelect">
      <span v-if="showPlaceholder">{{ placeholder }}</span>
      <lav-multiple-value-list v-if="showMultipleValue" :selected="selected" @remove="$emit('clear-multiple', e)" />
      <span v-if="showSingleValue">{{ selected[0].name }}</span>
    </button>
    <input v-if="showInput" class="lav-input" tabindex type="text" v-model="val" @input="inputHandler" :placeholder="placeholder" @keydown.down="scrollDropdown" @keydown.up="scrollDropdown" @keydown.enter="keyBoardSelect" ref="searchInput" />
    <span v-if="showCleaner" class="lav-input-cleaner" @click="$emit('clear')">
      <lav-icon name="close" :size="9"></lav-icon>
    </span>
    <span class="lav-input-after">
      <lav-icon name="arrow-down"></lav-icon>
    </span>
  </span>
</template>

<script>
import lavIcon from '../../icon';
import lavMultipleValueList from '../multiple-value-list';
export default {
  components: { lavIcon, lavMultipleValueList },
  props: {
    status: String,
    searchable: Boolean,
    multiple: Boolean,
    placeholder: String,
    selected: Array,
    value: String
  },
  data() {
    return {
      val: ''
    }
  },
  computed: {
    showButton() {
      return (this.status !== 'searching');
    },
    showPlaceholder() {
      return (this.status === 'inactive' || this.status === 'active');
    },
    showSingleValue() {
      return (!this.multiple && this.status === 'selected');
    },
    showMultipleValue() {
      return (this.multiple && this.status === 'selected');
    },
    showInput() {
      return (this.status === 'searching' && this.searchable);
    },
    showCleaner() {
      return this.val.length !== 0;
    }
  },
  methods: {
    inputHandler(e) {
      this.$emit('input', this.val);
    },
    buttonClickHandler() {
      if(this.searchable) {
        this.$emit('start-searching')
      } else {
        this.$emit('start-active')
      }
      this.$nextTick(this.focusOnInput);
    },
    focusOnInput() {
      this.searchable ? this.$refs.searchInput.focus() : this.$refs.button.focus();
    }
  }
}
</script>

<style lang="css">
</style>
