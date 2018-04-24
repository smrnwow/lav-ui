<template lang="html">
  <span class="lav-select-selected" @click.stop="removeSelected">
    {{ name }}
    <span class="lav-select-selected-remove">
      <lav-icon name="close" :size="7" color="#fff" />
    </span>
  </span>
</template>

<script>
import lavIcon from '../../icon';
export default {
  components: { lavIcon },
  props: {
    name: String
  },
  methods: {
    removeSelected() {
      this.$emit('remove', this.name);
    }
  }
}
</script>

<style lang="css">
</style>
