const express = require('express')
const { nanoid } = require('nanoid')
const db = require('../lowdb')

const projectRouter = express.Router()

projectRouter.use((req, res, next) => {
  console.log('Time:', new Date())
  next()
})

projectRouter.get('/', (req, res) => {
  res.json({
    data: db.get('projects').value() || [],
    message: 'success'
  })
})

projectRouter.get('/import', (req, res) => {
  saveProject(req.query)
  res.json({
    message: 'success'
  })
})

module.exports = projectRouter

const getProjectName = (folder) => {
  try {
    const paths = folder.split('/')
    return paths[paths.length - 1]
  } catch (err) {
    console.log(err)
  }
  return ''
}

const saveProject = ({ name, path }) => {
  const id = nanoid(7)
  if (!name) name = getProjectName(path)
  const project = { id, name, path }
  db.get('projects').push(project).write()
}
