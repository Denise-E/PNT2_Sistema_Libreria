<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import reservationsService from '../../service/reservationsService'
import booksService from '../../service/booksService'
import usersService from '../../service/usersService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        reservation: {},
        isError: false,
        errorMessage: '',
        book_name: '',
        client_email: ''
    }
  },
  async mounted(){
    await this.loadData()
  },
  methods: {
   async loadData() {
       const reservs = await reservationsService.loadData()
       const res = reservs.find(a => a.id ==  this.$route.params.id)

        const users = await usersService.loadData()
        const books = await booksService.loadData()

        this.client_name = users.find(client => client.id == res.id_client).email
        this.book_name = books.find(book => book.id == res.id_book).title

       this.reservation = res
    },

    async saveChanges(){
      let result = undefined
      let new_user = undefined

      new_user = await usersService.getIdUserByEmail(this.client_email)
     
      if(new_user){
        this.reservation.id_client = new_user
        result = await reservationsService.updateReservation(this.reservation) 
      }
      

      if(result){ // Validar segun usuario
        this.$router.push({ path: '/reservations' }).catch(err => {});

        // Reload the page after a short delay (adjust as needed)
        setTimeout(() => {
          // Go back to the current route
          this.$router.go(0);
        }, 100);
      }else{
        this.errorMessage = "Error de edición. Verifique los datos ingresados"
      }
      
    }

    }

}

</script>

<template>
    
  <ion-page id="page">
    <ion-content>

        <h2>Edicion </h2>
        <ion-input v-model="this.reservation.id" label='id' type='text' style="display: none;"></ion-input>
        <ion-input v-model="this.client_email" label='Cliente: ' type='text'></ion-input>
        <ion-input v-model="this.reservation.id_book" label='book' type='text' style="display: none"></ion-input>
        <p>Libro: {{book_name}}</p> 
        <ion-button @click="saveChanges()">Guardar</ion-button>
        <p style="color: red; font-weight:bold"> {{errorMessage}}</p>

    </ion-content>
  </ion-page>
</template>


<style>
#page {
  margin-left: 3rem;
}
</style>