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
      <div class="filter-block">
        <div class="filter-author">
          <input  
            v-model="filter"
            type="text"
            placeHolder="Найти автора"
          >
          <div class="border"></div>
        </div>
        <div class="filter-date">
          <input 
            :id="`${index}-checkbox`"
            v-model="checked"
            type="checkbox"  
          >
          <label :for="`${index}-checkbox`" />
          <div class="filter-date-text">
            Свежие книги на этой неделе
          </div>
        </div>
      </div>
      <div class="books-container">
        <book-block 
          v-for="(item,i) in filteredBook" 
          :key="`${index}-${item.id}`"
          :indexTheme="index" 
          :index="item.id"
        />
      </div> 
    </div>
  </div>
</template>

<script>



export default {
  props: ['index'],
  data () {
    return {
      theme: this.$store.getters.getThemeBooks(this.index),
      showBooks: false,
      filter: '',
      checked: false,
    }
  },
  computed: {
    showBooksChange: function () {
      this.showBooks = this.$store.getters.getShowBook(this.index)
      return true
    },
    filteredBook: function () {
      let allBooks = this.$store.getters.getThemeBooks(this.index).items.slice()
      let timeBorder = 0
      this.checked ? timeBorder = (new Date().setDate(new Date().getDate() - 7) / 1000).toFixed(0) : timeBorder = 0
      
      

      let filtered = allBooks.filter( (item) => {
        if (item.author_last_name.indexOf(this.filter) != -1) {
          if ((new Date(item.date_add).getTime() / 1000) > timeBorder) {
            return item
          }
        } else if(item.author_first_name.slice(0,1).indexOf(this.filter) != -1) {
          if ((new Date(item.date_add).getTime() / 1000) > timeBorder) {
            return item
          }
        } else if(item.author_mid_name.slice(0,1).indexOf(this.filter) != -1) {
          if ((new Date(item.date_add).getTime() / 1000) > timeBorder) {
            return item
          }
        } 
      })
      return filtered
    }
  },
  methods: {
    setTitle: function() {  
      return this.theme.genre_name
    },
    openBooks: function() {
      this.showBooks = this.$store.commit('setShowBook', this.index)
    },
  }
}
</script>

<style lang="sass" scoped> 

    @import './ThemeBlock.sass'
    
</style>

