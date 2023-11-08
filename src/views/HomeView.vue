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
        book: {},
        isAdmin: false,
        userId: 0,
    }
  },
  async mounted(){
    await this.loadData(),
    this.logedUser()
  },
  methods: {
    async loadData() {
      
      try {
        const listado  = await booksService.loadData()
        this.lista = listado.filter(i => i.avalaible_quantity > 0).sort((a,b) => a.title.localeCompare(b.title))
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
    },
    logedUser(){
      this.isAdmin = localStorage.getItem("user_admin")
      this.userId = localStorage.getItem("user_id")
    }

  }
}
</script>

<template>
    
  <ion-page>
    
    <ion-content class="ion-text-center">

      <div v-if="editar">
           <h2>Editar libro</h2>

        <ion-input v-model="this.book.title" label='title' type='text' ></ion-input>
        <ion-input v-model="this.book.author" label='author' type='text'></ion-input>
        <ion-input v-model="this.book.avalaible_quantity" label='quantity' type='number'></ion-input>
        <ion-button @click="saveChanges(this.book.id)">Guardar cambios</ion-button>
      
      </div>

      <div v-else>
          <h2>Nuestros libros disponibles</h2>

          <div v-if="isError">
              {{ errorMessage }}
          </div>

          
          <ion-list>
            
              <ion-item> 
                <ion-grid>
                  <ion-row class="headers">
                    <ion-col>Title</ion-col> 
                    <ion-col>Author</ion-col> 
                    <ion-col v-if="isAdmin != null">Actions</ion-col> 
                  </ion-row>
                </ion-grid>
              </ion-item>

              <ion-item v-for="e in lista" :key="e.id">
                <ion-grid>
                  <ion-row class="content">
                    <ion-col>{{ e.title }}</ion-col>
                    <ion-col>{{ e.author }}</ion-col>
                    <ion-col v-if="isAdmin != null">
                      <div v-if="isAdmin == 'true'">
                        <ion-button @click="reservationPage(e.id)">Reservar</ion-button>
                        <ion-button @click="editBook(e.id)">Editar</ion-button>
                        <ion-button @click="deleteBook(e.id)">Borrar</ion-button>
                      </div>
                      <div v-if="isAdmin == 'false'">
                        <ion-button @click="reservationPage(e.id)">Reservar</ion-button>
                      </div>
                    
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </ion-item>
            
        </ion-list>
        </div>


    </ion-content>
  </ion-page>
</template>

<style>

.headers{
  font-size: large;
  font-weight: 600;
  text-align: center;
}

.content{
  text-align: center;
}




</style>