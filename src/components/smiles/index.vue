<template lang="html">
  <component :is="name" :size="size" @click="$emit('click', $event)" />
</template>

<script>
import angel from './angel';
import angry from './angry';
import angry1 from './angry-1';
import arrogant from './arrogant';
import bored from './bored';
import confused from './confused';
import cool from './cool';
import cool1 from './cool-1';
import crying from './crying';
import crying1 from './crying-1';
import crying2 from './crying-2';
import cute from './cute';
import embarrassed from './embarrassed';
import emoji from './emoji';
import greed from './greed';
import happy from './happy';
import happy1 from './happy-1';
import happy2 from './happy-2';
import happy3 from './happy-3';
import happy4 from './happy-4';
import happy5 from './happy-5';
import happy6 from './happy-6';
import happy7 from './happy-7';
export default {
  components: { angel, angry, angry1, arrogant, bored, confused, cool, cool1, crying, crying1, crying2, cute, embarrassed, emoji, greed, happy, happy1, happy2, happy3, happy4, happy5, happy6, happy7 },
  props: {
    size: {
      type: Number,
      default: 16
    },
    name: String
  }
}
</script>
