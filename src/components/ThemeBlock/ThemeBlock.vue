<template>
  <div class="theme-cointainer">
    <div class="theme-block">
      <div class="title-theme">
        {{ setTitle() }}
      </div>
      <div 
        class="theme-link"
        @click="openBooks"
      >
        <div class="link-text">
          Список книг
        </div>
        <div 
          class="link-arrow" 
          :class="{'link-arrow-show':showBooks}" 
          :data-show="{showBooksChange}"
        />
      </div>
    </div>
    <div 
      class="books-block"
      :class="{'books-block-show':showBooks}"
      :data-show="{showBooksChange}"
    >
      <book-block 
        v-for="(item,i) in theme.items" 
        :key="`${index}-${item.id}`"
        :indexTheme="index" 
        :index="i"
      />
    </div>
  </div>
</template>

<script>



export default {
  props: ['index'],
  data () {
    return {
      theme: this.$store.getters.getThemeBooks(this.index),
      showBooks: false
    }
  },
  computed: {
    showBooksChange: function () {
      this.showBooks = this.$store.getters.getShowBook(this.index)
      return true
    }
  },
  methods: {
    setTitle: function () {  
      return this.theme.genre_name
    },
    openBooks: function() {
      this.showBooks = this.$store.commit('setShowBook', this.index)
    }
  }
}
</script>

<style lang="sass" scoped> 

    @import './ThemeBlock.sass'
    
</style>

