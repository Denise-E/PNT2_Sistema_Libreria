<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import reservationsService from '../../service/reservationsService'

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
        <h1>HOLA</h1>
    </ion-content>
  </ion-page>
</template>