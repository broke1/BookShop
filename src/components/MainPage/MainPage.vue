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
        <div 
          class="add-btn"
          @click="showModal=true"
        >
          <div class="btn-text">
            Добавить книгу
          </div>
          <div class="btn-img" />
        </div>
      </div>
      <modal-add-book 
        :showModal="showModal" 
        @cancelModal="showModal=false"
      />
    </div>
  </section>
</template>

<script>
//import ThemeBlock from '../ThemeBlock/ThemeBlock.vue'


export default {
  //components: { ThemeBlock },
  data () {
    return {
      themes: [],
      showModal: false
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

