import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // User Routes
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/users/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/users/RegisterView.vue')
    },
    {
      path: '/users', 
      name: 'users',
      component: () => import('../views/users/UsersListView.vue')
    },
    {
      path: '/user/edit/:id',
      name: 'edit',
      component: () => import('../views/users/EditUserView.vue')
    },
    // Books routes
    {
      path: '/books/add',
      name: 'book_add',
      component: () => import('../views/books/BookAddView.vue')
    },
    // Reservations 
    {
      path: '/reservations', 
      name: 'reservations_list',
      component: () => import('../views/reservations/ReservationsListView.vue')
    },
    {
      path: '/reservations/add',
      name: 'reservations_add',
      component: () => import('../views/reservations/ReservationsAddView.vue')
    },
    {
      path: '/reservations/edit/:id', // Con botón para borrar
      name: 'reservations_edit',
      component: () => import('../views/reservations/ReservationsEditView.vue')
    }
  ]
})

export default router
