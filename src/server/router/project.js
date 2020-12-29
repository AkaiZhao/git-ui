const express = require('express')

const { saveProject, getDBProjects } = require('../utils/project')

const projectRouter = express.Router()

projectRouter.use((req, res, next) => {
  console.log('Time:', new Date())
  next()
})

projectRouter.get('/', (req, res) => {
  try {
    const data = getDBProjects()
    res.json({
      data,
      message: 'success'
    })
  } catch (err) {
    console.log(err)
  }
})

projectRouter.get('/import', (req, res) => {
  saveProject(req.query)
  res.json({
    message: 'success'
  })
})

module.exports = projectRouter
