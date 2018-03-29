<template lang="html">
  <transition name="tag">
    <span v-if="visible" @click="clickHandler" class="lav-tag" :style="styles">
      <span class="lav-tag-body">
        {{ label }}
      </span>
      <span v-if="deletable" class="lav-tag-close" @click.stop="deleteTag">
        <lav-icon name="close" :color="color"></lav-icon>
      </span>
    </span>
  </transition>
</template>

<script>
import lavIcon from '../icon';
import colorMixin from '../../mixins/color/index.js';
export default {
  components: { lavIcon },
  mixins: [colorMixin],
  props: {
    label: String,
    color: {
      type: String,
      default: 'rgb(2, 146, 234)'
    },
    deletable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    }
  },
  mounted() {
    this.show();
  },
  methods: {
    clickHandler(e) {
      this.$emit('click', e);
    },
    deleteTag() {
      this.$emit('delete');
      this.hide();
    },
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    }
  },
  computed: {
    styles() {
      return {
        backgroundColor: this.setColor(this.color),
        color: this.color,
        border: `1px solid ${this.color}`
      }
    }
  }
}
</script>