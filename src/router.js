import VueRouter from 'vue-router'

import Welcome from './components/public-page/Welcome.vue'
import Login from './components/public-page/components/Login.vue'
import Register from './components/public-page/components/Register.vue'

import Admin from './components/admin/Admin.vue'
import Profile from './components/admin/components/Profile.vue'
import AdminOption from './components/admin/components/AdminOption.vue'

import Home from './components/home/Home.vue'
import Practice from './components/home/components/Practice.vue'

import Error from './components/error/Error.vue'

import Test from './components/test/Test.vue'
import PublicContent from './components/test/components/PublicContent.vue'
import PrivateContent from './components/test/components/PrivateContent.vue'

const router = new VueRouter({
    mode: '',
    base: __dirname,
    routes: [
      { path: '/', 
        redirect: '/home'},

      {
        path: '/error',
        name: 'error',
        component: Error
      },

      { path: '/welcome',
        name: 'welcome',
        component: Welcome,
        children: [
          { path: 'login',
            name: 'login',
            component: Login },
          { path: 'register', 
            name: 'register',
            component: Register }
        ]
      },

      {
        path: '/home',
        name: 'home',
        component: Home,
        children: []
      },

      { path: '/admin',
        name: 'admin',
        component: Admin,
        children: [
          { path: 'profile',
            name: 'profile',
            component: Profile
            },
          {
            path: 'adminoption',
            name: 'adminoption',
            component: AdminOption
          }
        ]
      },

      {
        path: '/practice',
        name: 'practice',
        component: Practice
      },

      {
        path: '/test',
        name: 'test',
        component: Test,
        children: [
          {
            path: 'public',
            name: 'public',
            component: PublicContent
          },

          {
            path: 'private',
            name: 'private',
            component: PrivateContent
          }
        ]
      }

    ]
  })

router.beforeEach((to, from, next) => {
  const publicPages = ['/welcome/login', '/welcome/register', '/home', '/practice', 
                        '/test', '/test/public'];
  const adminPages = ['/admin'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const adminOnly = adminPages.includes(to.path);
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/home');
  } else if (!authRequired) {
    next();
  } else {
    const user_data = JSON.parse(loggedIn);
    const role = user_data['user_role'];
    const is_user = (role == "USER");
    if (is_user && adminOnly) {
      next('/error');
    } else {
      next();
    }
  }
});

// router.afterEach((to, from, next) => {
//   iView.LoadingBar.finish();
// })

export default router