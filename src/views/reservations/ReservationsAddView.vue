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
        userEmail: null,
        isError: false,
        errorMessage: '',
        book: {},
        isAdmin: false,
        userId: 0,
    }
  },
  mounted(){
    this.getBook(),
    this.logedUser()
  },
  methods: {
    async addReservation() {
      try {
        this.reservation.id_book = this.book.id

        const book = await booksService.getBookById(this.book.id)
        book.data.avalaible_quantity = parseInt(book.data.avalaible_quantity) - 1
        await booksService.updateBook(this.book.id, book.data)

        if(this.reservation.id_client == undefined) {
          this.reservation.id_client = this.userId
        }

        await reservationsService.saveData(this.reservation)

      
        //await booksService.updateBookAvailability(this.reservation.id_book)

        this.$router.push({ path: '/' }).catch(err => {});

        setTimeout(() => {
            this.$router.go(0);
        }, 1);

      } catch(e) {
        this.errorMessage = e
      }
    },
    async tryReservation () {
      try {
        
        const res = await usersService.loadData()

        const user = res.find(r => r.email == this.userEmail )

        if (user) {
          this.reservation.id_client = user.id
          this.addReservation()
        }else{
          this.errorMessage = 'No se encontro ningun usuario con ese mail'
        }

      } catch(e) {
        this.errorMessage = e
      }
    },

    async getBook() {
        const id = parseInt(this.$route.params.book_id)
        const book = await booksService.getBookById(id)
        this.book = book.data
    },
    logedUser(){
      this.isAdmin = localStorage.getItem("user_admin")
      this.userId = localStorage.getItem("user_id")
    }

  }
}
</script>

<template>
    
  <ion-page id="page">
    <ion-content>

        <h2>Agregar Reserva </h2>

        <h4>Libro: {{ book.title }}</h4>

        <div v-if="isAdmin == 'true'">
           <ion-input v-model="userEmail" label='Email del cliente: ' type='email'></ion-input>
          <ion-button @click="tryReservation()">Generar Reserva</ion-button>
        </div>

        <div v-else>
          
          <ion-button @click="addReservation()">Confirmar Reserva</ion-button>
        </div>
        <p style="color: red; font-weight:bold"> {{errorMessage}}</p>
        
    </ion-content>
  </ion-page>
</template>

<style>

#page {
  margin-left: 3rem;
}
</style>