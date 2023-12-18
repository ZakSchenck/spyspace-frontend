import { createRouter, createWebHashHistory } from 'vue-router';
import SigninPage from './views/SigninPage.vue';
import SignupPage from './views/SignupPage.vue';
import HomePage from './views/HomePage.vue';
import UserPostsPage from './views/UserPostsPage.vue';
import PostRepliesPage from './views/PostRepliesPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: {
      title: 'SpySpace - Home'
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninPage,
    meta: {
      title: 'SpySpace - Sign in'
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
    meta: {
      title: 'SpySpace - Sign up'
    }
  },
  {
    path: '/users/:username/posts',
    name: 'UserPostsPage',
    component: UserPostsPage,
    props: true,
    meta: {
      title: 'SpySpace - User posts'
    }
  },
  {
    path: '/posts/:postId/replies',
    name: 'PostRepliesPage',
    component: PostRepliesPage,
    props: true,
    meta: {
      title: 'SpySpace - Replies'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  }

  next();
});

export default router;