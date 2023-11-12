<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import usersService from '../../service/usersService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        user: {},
        isError: false,
        errorMessage: ''
    }
  },
  async mounted(){
    await this.loadData()
  },
  methods: {
   async loadData() {
       const users = await usersService.loadData()
       const user = users.find(a => a.id ==  this.$route.params.id)
       this.user = user
    },

    async saveChanges(){
      const result = await usersService.updateUser(this.user) 

      if(result){ // Validar segun usuario
        this.$router.push({ path: '/users' }).catch(err => {});

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
    
  <ion-page id="page">
    <ion-content>

        <h2>Edición de usuario </h2>

        <ion-input v-model="this.user.name" label='Nombre:' type='text'></ion-input>
        <ion-input v-model="this.user.email" label='Mail:' type='text'></ion-input>
        <ion-input v-model="this.user.password" label='Contraseña:' type='text'></ion-input>
        <ion-button @click="saveChanges()">Guardar</ion-button>
        <p style="color: red; font-weight:bold"> {{errorMessage}}</p>

    </ion-content>
  </ion-page>
</template>


<style >
 #page {
  margin-left: 3rem;
 }
</style>