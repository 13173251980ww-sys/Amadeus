import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        name: 'layout',
        component: () => import('@/views/Layout/layout.vue'),
        children: [
            {path:'', component:()=>import('@/views/Home/Home.vue')},
            {path:'messageBoard',component:()=>import('@/views/MessageBoard/MessageBoard.vue')},
            {path:'friendLink',component:()=>import('@/views/FriendLink/FriendLink.vue')},
            {path:'blog',component:()=>import('@/views/Blog/Blog.vue')}
        ]
      },
      {
          path: '/login',
          name: 'login',
          component: () => import('@/views/Login/Login.vue'),
      }
  ],
})

// 全局路由守卫：未登录跳转登录页
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path !== '/login' && !token) {
    next('/login');
  } else {
    next();
  }
})

export default router
