<script>
import {IonHeader, IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {IonHeader, IonPage, IonContent, IonList, IonInput, IonButton}
}
</script>

<template>
    <ion-header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <!-- Resto de links al loguearse -->
        </nav>
        <nav>
            <RouterLink to="/login">Log in</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
            <!-- Hipervinculo log out al loguearse -->
        </nav>
        
        <RouterView />
  </ion-header>
</template>