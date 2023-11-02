<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import reservationsService from '../../service/reservationsService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        reservation: {},
        isError: false,
        errorMessage: ''
    }
  },
  async mounted(){
    await this.loadData()
  },
  methods: {
   async loadData() {
       const reservs = await reservationsService.loadData()
       const res = reservs.find(a => a.id ==  this.$route.params.id)
       this.reservation = res
    },

    async saveChanges(){
      const result = await reservationsService.updateReservation(this.reservation) 

      if(result){ // Validar segun usuario
        this.$router.push({ path: '/reservations' }).catch(err => {});

        // Reload the page after a short delay (adjust as needed)
        setTimeout(() => {
          // Go back to the current route
          this.$router.go(0);
        }, 100);
      }else{
        this.errorMessage = "Error al guardar los cambios"
      }
      
    }

    }

}

</script>

<template>
    
  <ion-page>
    <ion-content>

        <h2>Edicion: </h2>
        <ion-input v-model="this.reservation.id" label='id' type='text' style="display: none;"></ion-input>
        <ion-input v-model="this.reservation.id_client" label='client' type='text'></ion-input>
        <ion-input v-model="this.reservation.id_book" label='book' type='text'></ion-input>
        <ion-button @click="saveChanges()">Guardar</ion-button>
        <p style="color: red; font-weight:bold"> {{errorMessage}}</p>

    </ion-content>
  </ion-page>
</template>