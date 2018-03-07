<template>
  <div class="divider">
    <span class="divider__label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: String
  }
}
</script>

<style>
.divider {
  position: relative;
  text-align: center;
}
.divider__label {
  position: relative;
  background: #f7f8f9;
  color: #333;
  font-size: 18px;
  padding: 0 20px;
}
.divider:before {
  position: absolute;
  top: 50%;
  left: 0;
  content: '';
  height: 2px;
  margin-top: -1px;
  width: 100%;
  background-color: #ccc;
}
</style>


