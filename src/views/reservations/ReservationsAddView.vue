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
        

        await reservationsService.saveData(this.reservation)
        console.log(this.reservation)
        await booksService.updateBookAvailability(this.reservation.id_book)

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
        this.book = await booksService.getBookById(id)
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
    <ion-content>

        <h2>Agregar Reserva: </h2>

        <h4>Libro: {{ book.title }}</h4>

        <div v-if="isAdmin == 'true'">
           <ion-input v-model="userEmail" label='Email del cliente: ' type='email'></ion-input>
           <ion-input v-model="reservation.id_book" type='text' value="{{ book.id }}" style="display:none;" ></ion-input>
          <ion-button @click="tryReservation()">Generar Reserva</ion-button>
        </div>

        <div v-else>
          <ion-input v-model="reservation.id_book" type='text' value="{{ book.id }}" style="display:none;" ></ion-input>
          <ion-button @click="addReservation()">Confirmar Reserva</ion-button>
        </div>
        <p style="color: red; font-weight:bold"> {{errorMessage}}</p>
        
    </ion-content>
  </ion-page>
</template>