import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Project from '../views/projects/index.vue'
import ProjectImport from '../views/projects/import.vue'
import ProjectList from '../views/projects/list.vue'

import Git from '../views/git/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/git',
    name: 'Git',
    component: Git
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
    children: [
      {
        path: 'import',
        name: 'ImportProject',
        component: ProjectImport
      },
      {
        path: 'list',
        name: 'ProjectList',
        component: ProjectList
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
