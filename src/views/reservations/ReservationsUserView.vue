<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import reservationsService from '../../service/reservationsService'
import booksService from '../../service/booksService'


export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        isError: false,
        errorMessage: '',
        editar: false,
        reservations: [],
        noReservations: false
    }
  },
  async mounted(){
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.reservations = []
      try {
        
        let lista_no_filter = await reservationsService.loadData()

        let lista = lista_no_filter.filter(b => b.id_client == this.$route.params.user_id)
        const books = await booksService.loadData()
        console.log(lista)



        if(lista.length <= 0 || lista == undefined) {
          this.noReservations = true
        }else{
            this.noReservations = false
            lista.forEach(e => {
            let book = books.find(book => book.id == e.id_book)
            this.reservations.push(book.title)
          })
        }


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
          <div v-if="noReservations">
              <p>Aún no tiene reservaciones</p>
          </div>

          <ion-list>
            
            <ion-item v-if="!noReservations"> 
              <ion-grid>
                <ion-row class="headers">
                  
                  <ion-col >Book Name</ion-col> 
                </ion-row>
              </ion-grid>
            </ion-item>

            <ion-item v-for="e in reservations" :key="e.id">
              <ion-grid>
                <ion-row class="content">
                  <ion-col>{{ e }}</ion-col>
   
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


</style>