<template>
  <main :class="theme">
    <router-view/>
  </main>    
</template>

<script>
export default {
   computed: {
    theme() {
      if(this.$store.state.theme !== true)
         return null
      return 'dark-mode'
    }
  }
}
</script>

<style>
@import './assets/style.css';
html, body, #app { 
    margin: 0; 
    padding: 0; 
    height: 100%; 
    width: auto; 
} 
main { 
    min-height: 100%;
    width: 100%; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    background-color: #FFFFFF; 
    padding: 20px; 
    border-radius: 5px; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
} 
</style>
