<template>
  <div 
    class="modal-container"
    :class="{'show-modal':showModal}"
  >
    <div class="modal-overlay" />
    <div class="modal-block">
      <div class="modal-title">
        Добавить книгу
      </div>
      <div class="modal-form">
        <div class="select-block">
          <select 
            v-model="form.genre"
            class="modal-select"
            :data-theme="themes"
          >
            <option 
              disabled
              value=""
            >
              Выберите жанр
            </option>
            <option
              v-for="(item,i) in themes" 
              :key="`${i}-${item.genre_id}`"
            >
              {{ item.genre_name }}
            </option>
          </select>
          <div class="arrow-select" />
        </div>
        <input 
          v-model="form.title" 
          placeholder="Название книги"
          class="form-input"
        >
        <input 
          v-model="form.author_last_name" 
          placeholder="Фамилия автора"
          class="form-input"
        >
        <input 
          v-model="form.author_first_name" 
          placeholder="Имя автора"
          class="form-input"
        >
        <input 
          v-model="form.author_mid_name" 
          placeholder="Отчество автора"
          class="form-input"
        >
        <div 
          class="message-block"
          :class="{'message-block-show': messageShow}"
        >
          {{ message }}
        </div>
        <div class="buttons-form">
          <div 
            class="accept-btn btn"
            @click="acceptModal"
          >
            Добавить
          </div>
          <div 
            class="cancel-btn btn"
            @click="cancelModal"
          >
            Отменить
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  props: ['showModal'],
  data () {
    return {
      form: {
        genre: '',
        title: '',
        author_last_name: '',
        author_first_name: '',
        author_mid_name: '',
      },
      message: 'Hello kitty',
      messageShow: false
    }
  },
  computed: {
    themes: function () {
      let themes = this.$store.getters.getThemes.slice()
      return themes.filter( item => {
        return item.items.length < 6
      })
    }
  },
  methods: {
    showMessage: function(message) {
      this.message = message
      this.messageShow = true
      setTimeout( () => {
        this.messageShow = false
      },3000)
    },
    acceptModal: async function() {
      if (this.form.genre == '') {
        this.showMessage('Выберите пожалуйста жанр')
      } else if (this.form.title == '') {
        this.showMessage('Напишите пожалуйста название книги')
      } else if (this.form.author_last_name == '') {
        this.showMessage('Напишите пожалуйста фамилию автора')
      } else if (this.form.author_first_name == '') {
        this.showMessage('Напишите пожалуйста имя автора')
      } else if (this.form.author_mid_name == '') {
        this.showMessage('Напишите пожалуйста отчество автора')
      } else {
        let genre_id = this.$store.getters.getThemes.filter( item => {
          return item.genre_name == this.form.genre
        })[0].genre_id
        let formData = new FormData()
        formData.append('genre_id', genre_id)
        formData.append('title', this.form.title)
        formData.append('author_last_name', this.form.author_last_name)
        formData.append('author_first_name', this.form.author_first_name)
        formData.append('author_mid_name', this.form.author_mid_name)
        let response = await this.$store.getters.addBook(formData)
        if (response == 'success') {
          this.showMessage('Книга успешно добавлена')
          setTimeout( () => {
            Object.keys(this.form).forEach( item => {
              this.form[item] = ''
            })
            this.cancelModal()
          },3000)
        } else if (response == 'exist') {
          this.showMessage('Такая книга уже существует.')
        } else {
          this.showMessage('Добавить книгу не удалось. Попробуйте позже.')
        }
      }
    },
    cancelModal: function() {
      this.$emit('cancelModal')
    }
  }
}
</script>

<style lang="sass" scoped> 

    @import './ModalAddBook.sass'
    
</style>

