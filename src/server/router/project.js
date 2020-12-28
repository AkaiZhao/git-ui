const express = require('express')
const { nanoid } = require('nanoid')
const db = require('../lowdb')

const project = express.Router()

project.use((req, res, next) => {
  console.log('Time:', new Date())
  next()
})

project.get('/', (req, res) => {
  res.json({
    data: db.get('projects').value() || [],
    message: 'success'
  })
})

project.get('/import', (req, res) => {
  saveProject(req.query)
  res.json({
    message: 'success'
  })
})

module.exports = project

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
