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
    data: {
      type: Object,
      default: () => ({})
    },
    index: Number
  },
  inject: ['selected'],
  methods: {
    getActive(option) {
      return (this.selected.length && this.selected.includes(option)) ? 'lav-select-dropdown-item_active' : '';
    },
    getHovered(option) {
      return (this.cursor === option) ? 'lav-select-dropdown-item_hovered' : '';
    }
  }
}
</script>
