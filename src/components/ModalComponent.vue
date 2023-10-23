<template>
  <div class="modal"  v-show="open" @click="$emit('close')">
    <div class="modal-container">
      <img :src="photo" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
    photo: String

  }
}
</script>

<style>
@import '../assets/style.css';
</style>
