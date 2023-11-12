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
    async login() {
      try {
        const rdo = await usersService.login(this.user)

        if(rdo){
            localStorage.setItem("user_id", rdo.id);
            localStorage.setItem("user_admin", rdo.admin);
            localStorage.setItem("user_name", rdo.name);

  
            
            this.$router.push({ path: '/' }).catch(err => {});

            setTimeout(() => {
                this.$router.go(0);
            }, 1);

        }else{
            this.errorMessage = 'Error de credenciales'
        }
        

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

        <h2>Bienvenido! </h2>

        <ion-input v-model="user.email" label='email' type='text'></ion-input>
        <ion-input v-model="user.password" label='password' type='password'></ion-input>
        <ion-button @click="login()">Ingresar</ion-button>
        <p style="color: red; font-weight:bold"> {{errorMessage}}</p>

    </ion-content>
  </ion-page>
</template>

<style >
#page{
  margin-left: 3rem;
}
</style>