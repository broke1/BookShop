<template>
  <section class="main-container">
    <div class="container">
      <div class="title-page">
        Электронная библиотека
      </div>
      <div class="themes-block">
        <theme-block :index="1" />
      </div>
    </div>
  </section>
</template>

<script>
import ThemeBlock from '../ThemeBlock/ThemeBlock.vue'


export default {
  components: { ThemeBlock },
  data () {
    return {
        
    }
  }
}
</script>

<style lang="sass" scoped> 
    @import './MainPage.sass'
    
</style>

