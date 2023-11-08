<script>

import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'

const user_admin = localStorage.getItem("user_admin")
const user_id = localStorage.getItem("user_id")
const user_name = localStorage.getItem("user_name")

export default {
  methods: {
    logout() {
        localStorage.removeItem("user_admin")
        localStorage.removeItem("user_id")
        localStorage.removeItem("user_name")
        this.$router.push({name: 'Login'})
    },

    redirect(){
      this.$router.push({name: 'AppVue'})

    }


  }
}
</script>

<template>
    <ion-page>
    <ion-content>

        <h2>Seguro que quiere cerrar sesion?</h2>
        <ion-button @click="logout()" >SI</ion-button>
        <ion-button @click="redirect()" >NO</ion-button>

    </ion-content>
  </ion-page>
  
    

</template>