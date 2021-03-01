import VueRouter from 'vue-router'

import Welcome from './components/public-page/Welcome.vue'
import Login from './components/public-page/components/Login.vue'
import Register from './components/public-page/components/Register.vue'

import Home from './components/main/Home.vue'
import Profile from './components/main/components/Profile.vue'
import Message from './components/main/components/Message.vue'
import Admin from './components/main/components/Admin.vue'

import Error from './components/error/Error.vue'

const router = new VueRouter({
    mode: '',
    base: __dirname,
    routes: [
      { path: '/', 
        redirect: '/welcome/login'},

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

      { path: '/home',
        name: 'home',
        component: Home,
        children: [
          { path: 'profile',
            name: 'profile',
            component: Profile
            },
          { path: 'message',
            name: 'message',
            component: Message
            },
          {
            path: 'admin',
            name: 'admin',
            component: Admin
          }
        ]
      }
    ]
  })

router.beforeEach((to, from, next) => {
  const publicPages = ['/welcome/login', '/welcome/register'];
  const adminPages = ['/home/admin'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const adminOnly = adminPages.includes(to.path);
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/welcome/login');
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