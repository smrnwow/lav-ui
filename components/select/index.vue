<template lang="html">
  <component :is="type" :placeholder="placeholder" :options="options" :search-action="searchAction" :alias="alias" />
</template>

<script>
import single from './single.vue';
import multiply from './multiply.vue';
export default {
  components: { single, multiply },
  props: {
    multiply: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Выберите...'
    },
    options: {
      type: Array,
      default: () => ([]),
      validator: value => {
        if(value.length === 0) return value;
        value.forEach(prop => {
          if(!prop.hasOwnProperty('name') || !prop.hasOwnProperty('value'))
            throw new SyntaxError('Options should contains \'name\' and \'value\' properties');
        })
        return value
      }
    },
    searchAction: {
      type: Function
    },
    alias: {
      type: Object,
      validator: value => {
        if(!value.hasOwnProperty('name') || !value.hasOwnProperty('value')) {
          throw new SyntaxError('Alias should contains \'name\' and \'value\' properties');
        }
        return value
      },
      default: () => ({ name: 'name', value: 'value' })
    },
    after: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    type() {
      return this.multiply ? 'multiply' : 'single';
    }
  }
}
</script>
