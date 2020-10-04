const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    component: () => import('layouts/Auth.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/auth/Login.vue')
      },
      {
        path: 'forgot-password',
        name: 'Forget Password',
        component: () => import('pages/auth/ForgotPassword.vue')
      },
      {
        path: 'reset-password',
        name: 'Reset Password',
        component: () => import('pages/auth/ResetPassword.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        meta: {
          auth: true
        },
        component: () => import('pages/dashboard/Index')
      },
      {
        path: '/users',
        name: 'Users',
        meta: {
          auth: true,
          module: 'User'
        },
        component: () => import('pages/dashboard/Users')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/errors/404.vue')
  }
]

export default routes
