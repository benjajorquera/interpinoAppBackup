import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/Login.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/sendingpreview',
    name: 'sendingpreview',
    component: () => import('../views/SendingPreview.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/agregarespecialista',
    name: 'agregarespecialista',
    component: () => import('../views/AgregarEspecialista.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/agregarservicioorigen',
    name: 'agregarservicioorigen',
    component: () => import('../views/AgregarServicioOrigen.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/alertasinterconsultas',
    name: 'alertasinterconsultas',
    component: () => import('../views/AlertasInterconsultas.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reportes',
    name: 'reportes',
    component: () => import('../views/Reportes.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: () => import('../views/Perfil.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getIsLogged) {
      store.commit('showErrorMessage', 'Debe iniciar sesión para acceder a esta página');
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
