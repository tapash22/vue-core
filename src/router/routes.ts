import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/AppLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'dashboard' },
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
      },
      {
        path: 'sales',
        name: 'sales',
        component: () => import('@/views/SalesView.vue'),
      },
      {
        path: 'customers',
        name: 'customers',
        component: () => import('@/views/CustomersView.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SettingsView.vue'),
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/layout/CloudAuthView.vue'),
    children: [
      // {
      //   path: 'forgot-password',
      //   name: 'auth-forgot-password',
      //   component: () => import('@/views/auth/project/CloudForgotPasswordView.vue')
      // },
      // {
      //   path: 'password-change-from-email',
      //   name: 'auth-forgot-password-token',
      //   component: () => import('@/views/auth/project/CloudForgotPasswordTokenView.vue')
      // },
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () => import('@/views/RegistrationView.vue')
      // },
      // {
      //   path: 'login',
      //   name: 'auth-login',
      //   component: () => import('@/views/auth/project/CloudLoginView.vue')
      // }
    ],
  },
];

export default routes;
