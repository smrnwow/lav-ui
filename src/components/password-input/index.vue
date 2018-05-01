<template lang="html">
  <label class="lav-label">
    <span class="lav-input-wrap">
      <span class="lav-input-after" v-if="before" :style="bgColor">
        <lav-icon :name="beforeIcon" :color="color"></lav-icon>
      </span>
      <input :type="type" class="lav-input" @input="update" v-model="val" :placeholder="placeholder" />
      <span v-if="showCleaner" class="lav-input-cleaner" @click="clearInput">
        <lav-icon name="close" :size="9"></lav-icon>
      </span>
    </span>
    <span class="lav-input-after" @click="showInput" :style="bgColor">
      <lav-icon :name="afterIcon" :color="color"></lav-icon>
    </span>
  </label>
</template>

<script>
import lavIcon from '../icon';
import colorMixin from '../../mixins/color';

export default {
  name: 'lav-password-input',
  mixins: [colorMixin],
  components: { lavIcon },
  data() {
    return {
      val: '',
      showValue: false
    }
  },
  props: {
    value: String,
    placeholder: String,
    before: {
      type: Boolean,
      default: false
    },
    beforeIcon: String,
    color: {
      type: String,
      default: '#0286c2'
    }
  },
  computed: {
    bgColor() {
      return {
        backgroundColor: this.setColorTransparent(this.color, 0.3)
      }
    },
    showCleaner() {
      return this.value.length > 0;
    },
    type() {
      return this.showValue ? 'text' : 'password';
    },
    afterIcon() {
      return this.showValue ? 'eye' : 'eye-closed';
    }
  },
  methods: {
    showInput() {
      this.showValue = !this.showValue;
    },
    clearInput() {
      this.val = '';
      this.showValue = false;
      this.$emit('input', '');
    },
    update(e) {
      this.$emit('input', this.val);
    },
  }
}
</script>
