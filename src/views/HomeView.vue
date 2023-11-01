<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import booksService from '../service/booksService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        lista: [],
        isError: false,
        errorMessage: '',
        editar: false,
        book: {}
    }
  },
  async mounted(){
    await this.loadData()
  },
  methods: {
    async loadData() {
      
      try {
        this.lista = await booksService.loadData()
      } catch(e) {
        this.isError = true;
        this.errorMessage = "No se pueden cargar los datos en este momento"
      }
    },
    async deleteBook(id) {
      try {
        await booksService.deleteBook(id)
        await this.loadData()
      } catch(e) {
        this.errorMessage = `Error al borrar ${e}`
      }
    },
    async editBook(id) {
      console.log(id)
       const books = await booksService.loadData()
       const book = books.find(a => a.id == id)
       this.book = book
       this.editar = true
    },
    async saveChanges(id){
      await booksService.updateBook(id, this.book) 
      this.loadData()
      this.editar = false
      this.book = {} 
    },
    reservationPage(id){
      this.$router.push({ path: `/reservations/add/${id}` })
    }

  }
}
</script>

<template>
    
  <ion-page>
    
    <ion-content>

      <div v-if="editar">
           <h2>Editar libro</h2>

        <ion-input v-model="this.book.title" label='title' type='text' ></ion-input>
        <ion-input v-model="this.book.author" label='author' type='text'></ion-input>
        <ion-input v-model="this.book.avalaible_quantity" label='quantity' type='number'></ion-input>
        <ion-button @click="saveChanges(this.book.id)">Guardar cambios</ion-button>
      
      </div>

      <div v-else>
          <h2>Nuestros libros</h2>

          <div v-if="isError">
              {{ errorMessage }}
          </div>

          <ion-list v-for="e in lista" :key="e.id">
              <article>
                  <h1>{{ e.title }}</h1>
                  <h4>{{e.author}}</h4>

                  <ion-button v-on:click="reservationPage(e.id)">Reservar</ion-button>

                  <ion-button v-on:click="editBook(e.id)">Editar</ion-button>
                  <ion-button v-on:click="deleteBook(e.id)">Borrar</ion-button>
              </article>
          </ion-list>
        </div>


    </ion-content>
  </ion-page>
</template>