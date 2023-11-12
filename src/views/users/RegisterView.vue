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
  methods: {
    async addUser() {
      try {
        await usersService.saveData(this.user)
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
    
  <ion-page id="page">
    <ion-content>

        <h2>Bienvenido! Registrate: </h2>

        <ion-input v-model="user.name" label='nombre' type='text'></ion-input>
        <ion-input v-model="user.email" label='email' type='text'></ion-input>
        <ion-input v-model="user.password" label='password' type='text'></ion-input>
        <ion-button @click="addUser()">Registrate</ion-button>

    </ion-content>
  </ion-page>
</template>


<style >
#page{
  margin-left: 3rem;
}
</style>