<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import reservationsService from '../../service/reservationsService'
import booksService from '../../service/booksService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        reservation: {},
        isError: false,
        errorMessage: '',
        book: {}
    }
  },
  mounted(){
    this.getBook()
  },
  methods: {
    async addReservation() {
      try {
        

        await reservationsService.saveData(this.reservation)
        this.$router.push({ path: '/' }).catch(err => {});

        setTimeout(() => {
            this.$router.go(0);
        }, 1);

      } catch(e) {
        this.errorMessage = e
      }
    },

    async getBook() {
        const id = parseInt(this.$route.params.book_id)
        this.book = await booksService.getBookById(id)
    }

  }
}
</script>

<template>
    
  <ion-page>
    <ion-content>

        <h2>Agregar Reserva: </h2>

        <h4>Libro: {{ book.title }}</h4>
        <ion-input v-model="reservation.id_client" label='Email del cliente: ' type='email'></ion-input>
        <ion-input v-model="reservation.id_book" type='text' value="{{ book.id }}" style="display:none;" ></ion-input>
        <ion-button @click="addReservation()">Agregar Reservacion</ion-button>
    </ion-content>
  </ion-page>
</template>