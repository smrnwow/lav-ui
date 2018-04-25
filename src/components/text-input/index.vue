<template lang="html">
  <label class="lav-label">
    <span class="lav-input-before" v-if="before">
      <lav-icon :name="beforeIcon" />
    </span>
    <span :class="classes">
      <input type="text" class="lav-input" @input="update" v-model="val" :placeholder="placeholder" />
      <span v-if="showCleaner" class="lav-input-cleaner" @click="clearInput">
        <lav-icon name="close" :size="9" />
      </span>
    </span>
    <span class="lav-input-after" v-if="after">
      <lav-icon :name="afterIcon" />
    </span>
  </label>
</template>

<script>
import lavIcon from '../icon';

export default {
  name: 'lav-input',
  components: { lavIcon },
  data() {
    return {
      val: ''
    }
  },
  props: {
    value: String,
    props: Object,
    after: {
      type: Boolean,
      default: false
    },
    afterIcon: {
      type: String,
      default: 'pen'
    },
    before: {
      type: Boolean,
      default: false
    },
    beforeIcon: {
      type: String,
      default: 'pen'
    },
    placeholder: String
  },
  computed: {
    showCleaner() {
      return this.val.length > 0;
    },
    classes() {
      return [
        'lav-input-wrap',
        { 'lav-input-wrap-with-after': this.after }
      ]
    }
  },
  methods: {
    clearInput() {
      this.val = '';
      this.$emit('input', '');
    },
    update(e) {
      this.$emit('input', this.val);
    },
  }
}
</script>
