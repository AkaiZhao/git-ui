import connect from './index'

export const execGit = (exec) => connect({
  url: '/git',
  params: { exec }
})
