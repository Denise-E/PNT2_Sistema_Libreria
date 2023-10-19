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
      path: '/user/edit/:id', // Con botón para borrar perfil
      name: 'edit',
      component: () => import('../views/users/EditUserView.vue')
    },
    // Books routes
    {
      path: '/books', // Con botón para borrar
      name: 'books_list',
      component: () => import('../views/books/BooksListView.vue')
    },
    {
      path: '/books/add',
      name: 'book_add',
      component: () => import('../views/books/BookAddView.vue')
    },
    {
      path: '/books/edit/:id', 
      name: 'book_edit',
      component: () => import('../views/books/BookEditView.vue')
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
