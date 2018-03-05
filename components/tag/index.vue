<template lang="html">
  <span class="lav-tag">
    {{ tag }}
  </span>
</template>

<script>
export default {
  props: {
    tag: {
      type: String
    }
  }
}
</script>

<style lang="css">
.lav-tag {
  padding: 1px 3px;
  line-height: 1;
  /* border-radius: 6px; */
}
.lav-tag:hover {
  color: #fff;
  background-color: mediumpurple;
}
</style>