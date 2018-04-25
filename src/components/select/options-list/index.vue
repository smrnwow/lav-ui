<template lang="html">
  <div class="lav-select-dropdown">
    <lav-select-options-item  v-for="(option, i) in options" :data="option" :index="i" :key="option.lavId" />
    <div v-if="!options.length" class="lav-select-dropdown-item">Ничего не найдено</div>
  </div>
</template>

<script>
import lavSelectOptionsItem from '../options-item';

export default {
  name: 'lav-select-options-list',
  components: { lavSelectOptionsItem },
  props: {
    options: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="css">
</style>
