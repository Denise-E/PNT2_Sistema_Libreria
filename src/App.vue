<script setup>
import HomeViewVue from './views/HomeView.vue'


const user_admin = localStorage.getItem("user_admin")
const user_id = localStorage.getItem("user_id")
const user_name = localStorage.getItem("user_name")


function logout(){
  localStorage.clear();
  window.location.href = "http://localhost:5173/"
}

</script>

<template>

    <ion-app class="wrapper">
      <ion-header id="header">            

            <div v-if="user_admin == null" class="nav">
              <RouterLink to="/">Home | </RouterLink>
              <RouterLink to="/login">Log in | </RouterLink>
              <RouterLink to="/register">Register</RouterLink>
            </div>

            <div v-if="user_admin == 'true'" class="nav">
              <RouterLink to="/">Home | </RouterLink>
              <RouterLink to="/books/add">Agregar Libro | </RouterLink>
              <RouterLink to="/reservations">Reservaciones | </RouterLink>
              <RouterLink to="/users">Usuarios | </RouterLink>
              <ion-button v-on:click="logout()">Logout</ion-button>
            </div>

            <div v-if="user_admin == 'false'" class="nav">
              <RouterLink to="/">Home | </RouterLink>
              <RouterLink :to="'/reservations/'+user_id">Mis Reservas | </RouterLink>
              <ion-button v-on:click="logout()">Logout</ion-button>
            </div>

      </ion-header>
      <div class="main">
        <HomeViewVue />
        <RouterView />
      </div>
      
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

.nav {
  padding: .5rem;
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

#header {
  background-color: #fff;
  margin-bottom: 3rem;
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
