<template lang="html">
  <div class="lav-textarea-wrap">
    <textarea class="lav-textarea" v-model="val" :placeholder="placeholder" :rows="defaultRows"
      @input="update" @keyup.enter.prevent="send" ref="field">
    </textarea>
    <div class="lav-textarea-controls">
      <span class="lav-textarea-controls-item">
        <lav-dropdown trigger="click">
          <lav-icon slot="trigger" name="smile" />
          <lav-emoji slot="body" @select="selectHandler" />
        </lav-dropdown>
      </span>
      <span class="lav-textarea-controls-item" @click="send">
        <lav-icon name="send"/>
      </span>
    </div>
  </div>
</template>

<script>
import lavIcon from '../icon';
import lavButton from '../button';
import lavEmoji from './emoji';
import lavDropdown from '../dropdown';
export default {
  components: { lavIcon, lavButton, lavEmoji, lavDropdown },
  data() {
    return {
      val: this.value
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    defaultRows: {
      type: Number,
      default: 1
    },
    value: [Number, String]
  },
  mounted() {
    this.resize();
  },
  methods: {
    resize() {
      this.$refs.field.style.height = 'auto';
      this.$refs.field.style.height = this.$refs.field.scrollHeight + 'px';
    },
    update(e) {
      this.resize();
      this.$emit('input', this.val);
    },
    selectHandler(name) {
      console.log(name);
    },
    send() {
      this.$emit('send', this.val);
      this.val = '';
      this.update();
    }
  }
}
</script>

<style lang="css">
.lav-textarea-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 7px rgba(0,0,0,.15);
}
.lav-textarea {
  padding: 10px;
  width: 100%;
  resize: none;
  height: auto;
  border: none;
  line-height: 1.5;
  box-sizing: border-box;
  outline: none;
}
.lav-textarea-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-top: 1px solid rgba(0,0,0,.1);
}
.lav-textarea-controls-item {
  cursor: pointer;
}

::-webkit-input-placeholder { color: #2E2D38; }
::-moz-placeholder          { color: #2E2D38; }
:-ms-input-placeholder      { color: #2E2D38; }
</style>
