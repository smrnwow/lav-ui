<template lang="html">
  <label class="lav-label">
    <span class="lav-input-before" v-if="before" :style="bgColor">
      <lav-icon :name="beforeIcon" :color="color" />
    </span>
    <span :class="classes">
      <input type="text" class="lav-input" @input="update" v-model="val" :placeholder="placeholder" />
      <span v-if="showCleaner" class="lav-input-cleaner" @click="clearInput">
        <lav-icon name="close" :size="9" />
      </span>
    </span>
    <span class="lav-input-after" v-if="after" :style="bgColor">
      <lav-icon :name="afterIcon" :color="color" />
    </span>
  </label>
</template>

<script>
import lavIcon from '../icon';
import colorMixin from '../../mixins/color';

export default {
  name: 'lav-text-input',
  mixins: [colorMixin],
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
    color: {
      type: String,
      default: '#0286c2'
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
    },
    bgColor() {
      return {
        backgroundColor: this.setColorTransparent(this.color, 0.3)
      }
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
