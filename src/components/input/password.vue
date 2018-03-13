<template lang="html">
  <label class="lav-label">
    <span class="lav-input-wrap">
      <input :type="type" class="lav-input" @input="update" v-model="value" 
        :placeholder="props.placeholder" />
      <span v-if="showCleaner" class="lav-input-cleaner" @click="clearInput">
        <svg class="lav-icon" x="0px" y="0px" viewBox="0 0 21.9 21.9">
          <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
          c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
        </svg>
      </span>
    </span>
    <span class="lav-input-after" @click="showInput">
      <svg class="lav-icon" x="0px" y="0px" viewBox="0 0 525.153 525.153">
        <path d="M262.576,83.543C143.235,83.543,41.29,157.765,0,262.576c41.29,104.812,143.235,179.033,262.576,179.033
          s221.264-74.221,262.576-179.033C483.841,157.765,381.917,83.543,262.576,83.543z M262.576,381.917
          c-65.885,0-119.341-53.456-119.341-119.341s53.456-119.341,119.341-119.341s119.341,53.456,119.341,119.341
          S328.461,381.917,262.576,381.917z M262.576,190.98c-39.649,0-71.596,31.969-71.596,71.596s31.969,71.596,71.596,71.596
          s71.596-31.969,71.596-71.596S302.225,190.98,262.576,190.98z"/>
      </svg>
    </span>
  </label>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      showValue: false
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
    },
    type() {
      return this.showValue ? 'text' : 'password';
    }
  },
  methods: {
    showInput() {
      this.showValue = !this.showValue;
    },
    clearInput() {
      this.value = '';
      this.showValue = false;
      this.$emit('input', '');
    },
    update(e) {
      this.$emit('input', e.target.value);
    },
  }
}
</script>
