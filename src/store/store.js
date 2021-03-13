import books from "./assets/books.json"
import  api from './storeApi.js';

export default {
  state: {
    books: []
  },
  mutations: {
    setShowBook: (state, index) => {
      Object.keys(state.themes).forEach( (item) => {
        item == index ? state.themes[index] = !state.themes[index] : state.themes[item] = false
      });
    }
  },
  actions: {

  },
  getters: {
    getThemes: (state) => {
      return state.books
    },
    getThemeBooks: (state) => {
      return (index) => {
        return state.books[index]
      }
    },
    getShowBook: (state) => {
      return (index) => {
        if (state.books.length != 0) {
          if (!state.themes) {
            Vue.set(state, 'themes', {})
          }
          if (!state.themes[index]) {
            Vue.set(state.themes, index, false)
          }
          return state.themes[index]
        } else {
          return false
        }
      }
    },
    setBooks: (state) => {

      const checkStructure = (data) => {
        if (data.books && data.books[0].genre_id !== "undefined" && data.books[0].genre_name !== "undefined" && data.books[0].items !== "undefined") { 
          return true 
        } else{ 
          return false 
        }
      }

      return async () => {
        let booksState = []
        let response = await api.getBooks()
        if(response.status == "success") {
          if (checkStructure(response.data)) {
            booksState = response.data.books
          }
        } else {
          if (checkStructure(books)) {
            booksState = books.books
          }
        }
        Vue.set(state, 'books', booksState)
      }

    },
  }
}