<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import reservationsService from '../../service/reservationsService'
import usersService from '../../service/usersService'
import booksService from '../../service/booksService'


export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        isError: false,
        errorMessage: '',
        editar: false,
        reservations: [],
    }
  },
  async mounted(){
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.reservations = []
      try {
        
        const lista = await reservationsService.loadData()
        const users = await usersService.loadData()
        const books = await booksService.loadData()
        console.log(lista)

        lista.forEach(e => {
          let client = users.find(client => client.id == e.id_client)
          let book = books.find(book => book.id == e.id_book)
          this.reservations.push({client: client.name, book: book.title, id: e.id, idBook: e.id_book})
        }) 

        console.log("RESERV", this.reservations)

        this.errorMessage = ''
        this.isError = false
      } catch(e) {
        this.isError = true;
        this.errorMessage = "No se pueden cargar los datos en este momento"
        console.log(e)
      }
    },
    async deleteReservation(idRes, idBook) {
      try {

        const book = await booksService.getBookById(idBook)
        book.data.avalaible_quantity = parseInt(book.data.avalaible_quantity) + 1
        await booksService.updateBook(idBook, book.data)

        await reservationsService.deleteReservation(idRes)
        await this.loadData()
      } catch(e) {
        this.errorMessage = `Error al borrar ${e}`
      }
    },

    editReservation(id){
        this.$router.push('/reservations/edit/'+id)
    }

  }
}
</script>

<template>
    
  <ion-page id="page">
    
    <ion-content class="ion-text-center">

          <h2>Reservas </h2>

          <div v-if="isError">
              {{ errorMessage }}
          </div>

          <ion-list>
            
            <ion-item> 
              <ion-grid>
                <ion-row class="headers">
                  
                  <ion-col>Cliente Name</ion-col> 
                  <ion-col>Book Name</ion-col> 
                  <ion-col>Actions</ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>

            <ion-item v-for="e in reservations" :key="e.id">
              <ion-grid>
                <ion-row class="content">
                  <ion-col>{{ e.client }}</ion-col>
                  <ion-col>{{ e.book }}</ion-col>
                  <ion-col>
                    <ion-button v-on:click="editReservation(e.id)">Editar</ion-button>
                    <ion-button v-on:click="deleteReservation(e.id, e.idBook)">Borrar</ion-button>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>
          
      </ion-list>

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

#page{
  margin-top: 5rem;
}


</style>