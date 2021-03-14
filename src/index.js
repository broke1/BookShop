


window.Vue = require('vue') // подключаем Vue 

import store from './store/index.js' // подключаем файл с натсройками хранилища Vuex

import regeneratorRuntime from "regenerator-runtime"; // Для работы с асинхронными  функциями


Vue.component('main-page', require('./components/mainPage/mainPage.vue').default) // Основная страница

Vue.component('theme-block', require('./components/themeBlock/themeBlock.vue').default)  // Блок с жанрои

Vue.component('book-block', require('./components/bookBlock/bookBlock.vue').default)  // Блок с книгой

Vue.component('modal-add-book', require('./components/ModalAddBook/ModalAddBook.vue').default)  // Блок с модальным окном добавления книги

import "./sass/main.sass"




// создаем экземпляр vue где подключаем самое главное переадрасицию, визуализацию элемнетов и хранилище
new Vue({
  store,
  el: "#app" 
})