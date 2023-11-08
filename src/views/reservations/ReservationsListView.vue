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
    
    <ion-content class="ion-text-center">

          <h2>Reservas: </h2>

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

            <ion-item v-for="e in lista" :key="e.id">
              <ion-grid>
                <ion-row class="content">
                  <ion-col>{{ e.id_client }}</ion-col>
                  <ion-col>{{ e.id_book }}</ion-col>
                  <ion-col>
                    <ion-button v-on:click="editReservation(e.id)">Editar</ion-button>
                    <ion-button v-on:click="deleteReservation(e.id)">Borrar</ion-button>
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


</style>