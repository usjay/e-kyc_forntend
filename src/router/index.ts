import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserForm from '../components/UserForm.vue'
import LoginForm from '@/components/LoginForm.vue'
import NicImages from '@/components/NicImages.vue'
import PreviewPage from '@/components/PreviewPage.vue'
import SubmissionSuccess from '@/components/SubmissionSuccess.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/homee',
      firstname: 'home2',
      component: HomeView,
    },
    {
      path: '/',
      firstname: 'login',
      component: LoginForm,
    },
    {
      path: '/nicimage_test',
      firstname: 'nicupload',
      component: NicImages,
    },
    {
      path: '/userform',
      firstname: 'UserForm',
      component: UserForm,
    },
    {
      path: '/preview',
      firstname: 'preview',
      component: PreviewPage,
    },
    {
      path: '/about',
      firstname: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/thank-you',
      firstname: 'SubmissionSuccess',
      component: SubmissionSuccess,
    },

  ],
})

export default router
