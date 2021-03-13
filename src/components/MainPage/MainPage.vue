<template>
  <section class="main-container">
    <div class="container">
      <div class="title-page">
        Электронная библиотека
      </div>
      <div 
        class="themes-block"
        :data-check="{checkThemes}"
      >
        <theme-block 
          v-for="(item,i) in themes" 
          :key="`${i}-${item.genre_id}`"
          :index="i"
        />
      </div>
    </div>
  </section>
</template>

<script>
//import ThemeBlock from '../ThemeBlock/ThemeBlock.vue'


export default {
  //components: { ThemeBlock },
  data () {
    return {
      themes: []
    }
  },
  computed: {
    checkThemes: function () {
      
      this.themes = this.$store.getters.getThemes
      return true
    }
  },
  created() {
    this.$store.getters.setBooks()
  },
  
}
</script>

<style lang="sass" scoped> 
    @import './MainPage.sass'
    
</style>

