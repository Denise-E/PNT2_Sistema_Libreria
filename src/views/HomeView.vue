<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import booksService from '../service/booksService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        lista: [],
        isError: false,
        errorMessage: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.lista = await booksService.loadData()
      } catch(e) {
        this.isError = true;
        this.errorMessage = "No se pueden cargar los datos en este momento"
      }
    }

  }
}
</script>

<template>
    
  <ion-page>
    <ion-content>

        <h2>Nuestros libros</h2>

        <div v-if="isError">
            {{ errorMessage }}
        </div>

        <ion-list v-for="e in lista" :key="e.id">
            <article>
                <h1>{{ e.title }}</h1>
                <h4>{{e.author}}</h4>
            </article>
        </ion-list>

    </ion-content>
  </ion-page>
</template>