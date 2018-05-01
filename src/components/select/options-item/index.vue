<template lang="html">
  <div class="lav-select-dropdown-item" @click="select(data, index)"
    :class="[getActive(data), getHovered(index)]">
    {{ data.name }}
  </div>
</template>

<script>
export default {
  name: 'lav-select-options-item',
  props: {
    data: Object,
    index: Number
  },
  methods: {
    getActive(option) {
      return (this.$parent.selected.includes(option)) ? 'lav-select-dropdown-item_active' : '';
    },
    getHovered(option) {
      return (this.$parent.cursor === option) ? 'lav-select-dropdown-item_hovered' : '';
    },
    select(data, index) {
      this.$emit('select', data, index);
    }
  },
  watch: {
    selected(n) {
      console.log(n, 'n');
    }
  }
}
</script>
