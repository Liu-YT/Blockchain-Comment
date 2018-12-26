import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/UserLogin'
import AllComment from '@/components/AllComment'
import ProjectInfo from '@/components/ProjectInfo'
import UserRegisted from '@/components/SignUp'
import UserInfo from '@/components/UserInfo'
import CreateObject from '@/components/CreateObject'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/signup',
      name: 'UserRegisted',
      component: UserRegisted
    },
    {
      path: '/about',
      name: 'ProjectInfo',
      component: ProjectInfo
    },
    {
      path: '/user/info',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/user/create',
      name: 'CreateObject',
      component: CreateObject
    },
    {
      path: '/*',
      name: 'AllComment',
      component: AllComment
    }
  ]
})
