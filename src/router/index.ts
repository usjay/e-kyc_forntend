import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserForm from '../components/UserForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import NicImages from '@/components/NicImages.vue'
import PreviewPage from '@/components/PreviewPage.vue'
import SubmissionSuccess from '@/components/SubmissionSuccess.vue';
 import UserTable from '@/components/UserTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/homee',
      name: 'home2',
      component: HomeView,
    },
    {
      path: '/',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '/nicimage_test',
      name: 'nicupload',
      component: NicImages,
    },
    {
      path: '/userform',
      name: 'UserForm',
      component: UserForm,
    },
    {
      path: '/preview',
      name: 'preview',
      component: PreviewPage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/thank-you',
      name: 'SubmissionSuccess',
      component: SubmissionSuccess,
    },
    {
      path: '/users',
      name: 'UserTable',
      component: UserTable,
    },
    {
      path: '/students/:id',
      name: 'StudentPreview',
      component: () => import('@/components/StudentPreview.vue')
    }

//     {
//       path: '/students/:id',
//       name: 'StudentPreview',
//       component: () => import('@/views/StudentPreview.vue')
//     }
// ,

  ],
})

export default router
