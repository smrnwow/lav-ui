<template>
  <component :is="name" :props="props" />
</template>

<script>
import lavText from './text.vue';
import lavPassword from './password.vue';
import lavFile from './file.vue';
export default {
  components: { lavText, lavPassword, lavFile },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    after: {
      type: Boolean,
      default: false
    },
    placeholder: String
  },
  computed: {
    name() {
      return `lav-${this.type}`;
    },
    props() {
      switch(this.type) {
        case 'text':
          return {
            placeholder: this.placeholder,
            after: this.after
          }
        case 'password': 
          return {
            placeholder: this.placeholder
          }
        case 'file':
          return {
            multiple: this.multiple
          };
        default:
          return {};
      }
    }
  }
}
</script>
