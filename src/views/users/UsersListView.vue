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
        let users = await usersService.loadData()
        this.users = users.sort((a,b) => a.name.localeCompare(b.name))
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
    
    <ion-content class="ion-text-center">

          <h2>Usuarios</h2>

          <div v-if="isError">
              {{ errorMessage }}
          </div>

          <ion-list>
            
            <ion-item>
              <ion-grid>
                <ion-row class="headers">
                  <ion-col>Nombre</ion-col> 
                  <ion-col>Mail</ion-col>
                  <ion-col>Acciones</ion-col> 
                </ion-row>
              </ion-grid>
            </ion-item>

            <ion-item v-for="e in users" :key="e.id">
              <ion-grid>
                <ion-row class="content">
                  <ion-col>{{ e.name }}</ion-col>
                  <ion-col>{{ e.email }}</ion-col>
                  <ion-col>
                    <ion-button v-on:click="editUser(e.id)">Editar</ion-button>
                    <ion-button v-on:click="deleteUser(e.id)">Borrar</ion-button>
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