const express = require('express')
const simpleGit = require('simple-git')

const gitRouter = express.Router()

gitRouter.use((req, res, next) => {
  console.log('Time:', new Date())
  next()
})
gitRouter.get('/default', (req, res) => {
  const path = req.query.path
  if (!path) return res.status(400).json({ error: 400, message: 'no path' })
  options.baseDir = path
  res.json({})
})

gitRouter.get('/', async (req, res) => {
  const git = simpleGit(options)
  const data = await git.log({})
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
