<template lang="html">
  <transition name="tag">
    <span v-if="visible" @click="clickHandler" class="lav-tag" :style="{ backgroundColor: color }">
      <span class="lav-tag-body">
        {{ label }}
      </span>
      <span v-if="deletable" class="lav-tag-close" @click.stop="deleteTag">
        <svg class="lav-icon" x="0px" y="0px" viewBox="0 0 21.9 21.9">
          <path d="M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0
          c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7L14.1,11.3z"/>
        </svg>
      </span>
    </span>
  </transition>
</template>

<script>
export default {
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
  }
}
</script>

<style lang="css">
.lav-tag {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  margin: 3px;
  line-height: 1;
  color: #fff;
  border-radius: 6px;
  overflow: hidden;
}
.lav-tag-body {
  padding: 5px 10px;
}
.lav-tag-close {
  cursor: pointer;
  padding: 5px 10px;
  background: rgba(0,0,0,.2);
}
.lav-tag-close svg {
  height: 10px;
  width: 10px;
  fill: #fff;
}

.tag-enter-active, .tag-leave-active {
  transition: .2s ease-in-out;
}
.tag-enter, .tag-leave-to {
  opacity: 0;
}

</style>