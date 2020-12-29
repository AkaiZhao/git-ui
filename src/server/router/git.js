const express = require('express')
const simpleGit = require('simple-git')

const gitRouter = express.Router()

gitRouter.use((req, res, next) => {
  console.log('Time:', new Date())
  next()
})

gitRouter.get('/', async (req, res) => {
  console.log(req)
  const data = await git.log()
  res.json({
    data,
    message: 'success'
  })
})

module.exports = gitRouter

const options = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6
}

const git = simpleGit(options)
