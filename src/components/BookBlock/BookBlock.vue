<template>
  <div class="book-block">
    <div class="book-author">
      {{ getAuthor() }}
    </div>
    <div class="book-name">
      {{ getName() }}
    </div>
    <div class="book-date">
      {{ getDate() }}
    </div>
  </div>
</template>

<script>



export default {
  props: ['indexTheme', 'index'],
  data () {
    return {
      //book: this.$store.getters.getThemeBooks(this.indexTheme).items[this.index]
    }
  },
  computed: {
    book: function () {
      return this.$store.getters.getThemeBooks(this.indexTheme).items.filter( item => {
        return item.id == this.index
      })[0]
    },
  },
  methods: {
    getAuthor: function() {
      return `
      ${this.book.author_last_name} 
      ${this.book.author_first_name.slice(0,1)}${this.book.author_first_name != '' ? "." : ""} 
      ${this.book.author_mid_name.slice(0,1)}${this.book.author_mid_name != '' ? "." : ""}
      `
    },
    getName: function() {
      return `"${this.book.title}"`
    },
    getDate: function() {
      return this.book.date_add
    }
  }
}
</script>

<style lang="sass" scoped> 

    @import './BookBlock.sass'
    
</style>

