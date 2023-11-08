<script setup>
import HomeViewVue from './views/HomeView.vue'


const user_admin = localStorage.getItem("user_admin")
const user_id = localStorage.getItem("user_id")
const user_name = localStorage.getItem("user_name")

function logout(){
  localStorage.clear();
  //this.$router.push({ path: '/login' })
  window.location.reload();
}

</script>

<template>

    <ion-app class="wrapper">
      <ion-header>            

            <div v-if="user_admin == null">
              <RouterLink to="/">Home | </RouterLink>
              <RouterLink to="/login">Log in | </RouterLink>
              <RouterLink to="/register">Register | </RouterLink>
            </div>

            <div v-if="user_admin == 'true'">
              <RouterLink to="/">Home | </RouterLink>
              <RouterLink to="/books/add">Agregar Libro | </RouterLink>
              <RouterLink to="/reservations">Reservaciones | </RouterLink>
              <RouterLink to="/users">Usuarios | </RouterLink>
              <ion-button v-on:click="logout()">Logout | </ion-button>
            </div>

            <div v-if="user_admin == 'false'">
              <RouterLink to="/">Home | </RouterLink>
              <RouterLink :to="'/reservations/'+user_id">Mis Reservas | </RouterLink>
              <RouterLink :to="'/users/edit'+user_id">Mis Reservas | </RouterLink>
              <ion-button v-on:click="logout()">Logout | </ion-button>
            </div>

      </ion-header>
      <HomeViewVue />
      <RouterView />
    </ion-app>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
