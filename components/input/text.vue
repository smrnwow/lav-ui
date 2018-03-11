<template lang="html">
  <label class="lav-label">
    <span class="lav-input-wrap">
      <input type="text" class="lav-input" @input="update" v-model="value" 
        :placeholder="props.placeholder" />
      <span v-if="showCleaner" class="lav-input-cleaner" @click="clearInput">
        <svg class="lav-icon" x="0px" y="0px" viewBox="0 0 21.9 21.9">
          <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
          c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
        </svg>
      </span>
    </span>
    <span class="lav-input-after">
      <svg class="lav-icon" x="0px" y="0px" viewBox="0 0 459 459">
        <path d="M0,362.1V459h96.9l280.5-283.05l-96.9-96.9L0,362.1z M451.35,102c10.2-10.2,10.2-25.5,0-35.7L392.7,7.649
          c-10.2-10.2-25.5-10.2-35.7,0l-45.9,45.9l96.9,96.9L451.35,102z"/>
      </svg>
    </span>
  </label>
</template>

<script>
import '../../style.css';
export default {
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
