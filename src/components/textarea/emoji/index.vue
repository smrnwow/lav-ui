<template lang="html">
  <div class="lav-emoji-list">
    <div v-for="item in emoji" class="lav-emoji-item" @click="emojiClickHandler(item.name)">
      <emoji :name="item.name" :size="25" />
      <!-- <img :src="`../../../assets/emoji/${item.name}.svg`" /> -->
    </div>
  </div>
</template>

<script>
import emoji from '../../smiles';
export default {
  components: { emoji },
  methods: {
    emojiClickHandler(name) {
      this.$emit('select', name);
    }
  },
  data() {
    return {
      emoji: [
        { name: 'angel' },
        { name: 'angry' },
        { name: 'angry1' },
        { name: 'arrogant' },
        { name: 'bored' },
        { name: 'confused' },
        { name: 'cool' },
        { name: 'cool1' },
        { name: 'crying' },
        { name: 'crying1' },
        { name: 'crying2' },
        { name: 'cute' },
        { name: 'embarrassed' },
        { name: 'emoji' },
        { name: 'greed' },
        { name: 'happy' },
        { name: 'happy1' },
        { name: 'happy2' },
        { name: 'happy3' },
        { name: 'happy4' },
        { name: 'happy5' },
        { name: 'happy6' },
        { name: 'happy7' },
        // { name: 'in-love' },
        // { name: 'kiss' },
        // { name: 'kiss-1' },
        // { name: 'laughing' },
        // { name: 'laughing-1' },
        // { name: 'laughing-2' },
        // { name: 'muted' },
        // { name: 'nerd' },
        // { name: 'sad' },
        // { name: 'sad-1' },
        // { name: 'sad-2' },
        // { name: 'scare' },
        // { name: 'serious' },
        // { name: 'shocked' },
        // { name: 'sick' },
        // { name: 'sleepy' },
        // { name: 'smart' },
        // { name: 'surprised' },
        // { name: 'surprised-1' },
        // { name: 'surprised-2' },
        // { name: 'surprised-3' },
        // { name: 'surprised-4' },
        // { name: 'suspicious' },
        // { name: 'tongue' },
        // { name: 'vain' },
        // { name: 'wink' },
        // { name: 'wink-1' }
      ]
    }
  }
}
</script>

<style lang="css">
.lav-emoji-list {
  display: flex;
  flex-wrap: wrap;
  max-width: 270px;
}
.lav-emoji-item {
  margin: 5px;
  padding: 5px;
  transition: .2s ease-in-out;
  height: 35px;
}
.lav-emoji-item:hover {
  background-color: rgba(0,0,0,.1);
}
</style>
