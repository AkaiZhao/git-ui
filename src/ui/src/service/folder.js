import connect from './index'

export const getFolder = (path) => connect({
  url: '/folder',
  params: { path }
})

export const saveFolder = (path) => connect({
  url: '/folder/save',
  params: { path }
})
