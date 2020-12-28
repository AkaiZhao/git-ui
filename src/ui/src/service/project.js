import connect from './index'

export const getProject = () => connect({
  url: '/project'
})

export const importProject = (path) => connect({
  url: '/project/import',
  params: { path }
})

export const initProject = (path) => connect({
  url: '/project/init',
  params: { path }
})
