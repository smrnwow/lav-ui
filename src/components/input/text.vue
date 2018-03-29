<template lang="html">
  <label class="lav-label">
    <span class="lav-input-wrap">
      <input type="text" class="lav-input" @input="update" v-model="value" 
        :placeholder="props.placeholder" />
      <span v-if="showCleaner" class="lav-input-cleaner" @click="clearInput">
        <lav-icon name="close" :size="9"></lav-icon>
      </span>
    </span>
    <span class="lav-input-after" v-if="props.after">
      <lav-icon name="pen"></lav-icon>
    </span>
  </label>
</template>

<script>
import lavIcon from '../icon';

export default {
  components: { lavIcon },
  data() {
    return {
      value: ''
    }
  },
  props: {
    props: {
      type: Object
    },
    omega: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showCleaner() {
      return this.value.length > 0;
    },
    showOmega() {
      return this.omega && this.value.length <= 0;
    }
  },
  methods: {
    clearInput() {
      this.value = '';
      this.$emit('input', '');
    },
    update(e) {
      this.$emit('input', e.target.value);
    },
  }
}
</script>
