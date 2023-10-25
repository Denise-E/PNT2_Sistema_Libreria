<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import booksService from '../../service/booksService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        book: {},
        isError: false,
        errorMessage: ''
    }
  },
  methods: {
    async addBook() {
      try {
        await booksService.saveData(this.book)
        this.$router.push({ path: '/' }).catch(err => {});

        setTimeout(() => {
        this.$router.go(0);
      }, 1);

      } catch(e) {
        this.errorMessage = e
      }
    }

  }
}
</script>

<template>
    
  <ion-page>
    <ion-content>

        <h2>Nuevo libro</h2>

        <ion-input v-model="book.title" label='title' type='text'></ion-input>
        <ion-input v-model="book.author" label='author' type='text'></ion-input>
        <ion-input v-model="book.avalaible_quantity" label='quantity' type='number'></ion-input>
        <ion-button @click="addBook()">Agregar</ion-button>

    </ion-content>
  </ion-page>
</template>