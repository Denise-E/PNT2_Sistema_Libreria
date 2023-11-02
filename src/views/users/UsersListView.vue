<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import usersService from '../../service/usersService'

export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        users: [],
        isError: false,
        errorMessage: '',
    }
  },
  async mounted(){
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.users = await usersService.loadData()
      } catch(e) {
        this.isError = true;
        this.errorMessage = "No se pueden cargar los datos en este momento"
      }
    },
    async deleteUser(id) { 
      try {
        await usersService.deleteUser(id)
        await this.loadData()
      } catch(e) {
        this.errorMessage = `Error al borrar ${e}`
      }
    },
    editUser(id){
        this.$router.push('/user/edit/'+id)
    }
  }
}
</script>

<template>
    
  <ion-page>
    
    <ion-content>

          <h2>Usuarios</h2>

          <div v-if="isError">
              {{ errorMessage }}
          </div>

          <ion-list v-for="e in users" :key="e.id">
              <article>
                  <h1>{{ e.name }}</h1>
                  <h4>{{e.email}}</h4>
                  
                  <ion-button v-on:click="editUser(e.id)">Editar</ion-button>
                  <ion-button v-on:click="deleteUser(e.id)">Borrar</ion-button>
              </article>
          </ion-list>


    </ion-content>
  </ion-page>
</template>