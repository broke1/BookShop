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

        let  timeOut = setTimeout( async function tick() {

          let booksState = []
          let response = await api.getBooks()
          if(response.status == "success") {
            if (checkStructure(response.data)) {
              booksState = response.data.books
            }
          } else {
            if (checkStructure(books)) {
              booksState = JSON.parse(JSON.stringify(books.books))
            }
          }

          Vue.set(state, 'books', booksState)
          
          timeOut = setTimeout(tick, 900000); 
          
          //i++;
        }, 0);

      }
    
    },
    addBook: (state) => {

      const buetifulDate = (date) => {
        let newDate = date
        if (Number(date) < 10) {
          newDate = `0${date}`
        } 
        return newDate
      }

      return async (formdata) => {
        let response = await api.addBook(formdata)
        if(response.status == "success") {
          return 'success'
        } else {
          let chance = Math.floor(Math.random() * Math.floor(2)) // это ввел, чтобы сымитировать непостоянство сервера, 
                                                                  // что один раз может пройти запрос, а потом какие-то проблемы и запрос не прошел
          if (chance == 0) {
            return 'fail'
          } else {
            let exist = 0
            let ind = 0
            state.books.forEach( (genre,index) => {
              if (genre.genre_id == formdata.get('genre_id')) {
                
                genre.items.forEach( book => {
                  if (book.title == formdata.get('title')) {
                    exist = 1
                  }
                })
                ind = index
              }
            })
            if (exist == 0) {
              let date = new Date()
              let newBook = {
                id: state.books[ind].items.length,
                title: formdata.get('title'),
                date_add:  `${date.getFullYear()}-${buetifulDate(date.getMonth()+1)}-${buetifulDate(date.getDate())} ${buetifulDate(date.getHours())}:${buetifulDate(date.getMinutes())}:${buetifulDate(date.getSeconds())}`,
                author_last_name: formdata.get('author_last_name'),
                author_first_name: formdata.get('author_first_name'),
                author_mid_name: formdata.get('author_mid_name'),
              }
              state.books[ind].items.push(newBook)
              return 'success'
            } else {
              return 'exist'
            }

            
            
          } 
          
        }
        
      }

    },
  }
}