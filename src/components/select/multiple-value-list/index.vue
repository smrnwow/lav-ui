<template lang="html">
  <span class="lav-select-selected-wrap">
    <lav-multiple-value-item  v-for="(item, i) in selected" :name="item.name" :key="item.name" @remove="$emit('remove', i)" />
  </span>
</template>

<script>
import lavMultipleValueItem from '../multiple-value-item';
export default {
  components: { lavMultipleValueItem },
  props: {
    selected: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="css">
</style>
