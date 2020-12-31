const express = require('express')

const { getPaths } = require('../utils/folder')

const folderRouter = express.Router()

folderRouter.use((req, res, next) => {
  console.log('Time:', new Date())
  console.log('Url: ', req.originalUrl)
  next()
})

folderRouter.get('/', async (req, res) => {
  try {
    const path = req.query.path || process.cwd()
    const folders = await getPaths(path)
    res.json({
      message: 'get folder',
      path,
      folders
    })
  } catch (err) {
    res.status(500).json({ message: 'error', data: err })
  }
})

module.exports = folderRouter
