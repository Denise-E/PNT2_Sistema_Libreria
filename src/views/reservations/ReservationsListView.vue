<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import reservationsService from '../../service/reservationsService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        lista: [],
        isError: false,
        errorMessage: '',
        editar: false,
        reservation: {}
    }
  },
  async mounted(){
    await this.loadData()
  },
  methods: {
    async loadData() {
      
      try {
        this.lista = await reservationsService.loadData()
      } catch(e) {
        this.isError = true;
        this.errorMessage = "No se pueden cargar los datos en este momento"
      }
    },
    async deleteReservation(id) {
      try {
        await reservationsService.deleteReservation(id)
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
    
  <ion-page>
    
    <ion-content>

          <h2>Reservas: </h2>

          <div v-if="isError">
              {{ errorMessage }}
          </div>

          <ion-list v-for="e in lista" :key="e.id">
              <article>
                  <h1>{{ e.id_client }}</h1>
                  <h4>{{e.id_book}}</h4>
                  <ion-button v-on:click="editReservation(e.id)">Editar</ion-button>
                  <ion-button v-on:click="deleteReservation(e.id)">Borrar</ion-button>
              </article>
          </ion-list>

    </ion-content>
  </ion-page>
</template>