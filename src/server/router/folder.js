const express = require('express')
const fs = require('fs')
const path = require('path')
const winattr = require('winattr')
const isWindows = process.platform.indexOf('win') === 0

const folder = express.Router()

folder.use((req, res, next) => {
  console.log('Time:', new Date())
  console.log('Url: ', req.originalUrl)
  next()
})

folder.get('/', async (req, res) => {
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

module.exports = folder

const getPaths = async (basePath) => {
  let dirPath = basePath

  if (isWindows && basePath.match(/^([A-Z]{1}:)$/)) {
    dirPath = path.join(basePath, '\\')
  }

  const files = fs.readdirSync(dirPath, 'utf8')
  const result = await Promise.all(
    files.map(async (file) => {
      const folderPath = path.join(basePath, file)
      const state = getState(folderPath)
      return {
        path: folderPath,
        name: file,
        state
      }
    }, [])
  )
  return result
}

function getState (file) {
  const result = {
    directory: false,
    git: false,
    package: false,
    hidden: false
  }
  try {
    result.hidden = isHidden(file)

    file = file.replace(/\\/g, path.sep)
    result.directory = fs.statSync(file).isDirectory()
    if (!result.directory) return result

    const folders = fs.readdirSync(file, 'utf8')
    result.git = folders.includes('.git')
    result.package = folders.includes('package.json')

    return result
  } catch (e) {
    console.warn(e.message)
  }
  return result
}

function isHidden (file) {
  try {
    if (isWindows) {
      const windowsFile = file.replace(/\\/g, '\\\\')
      const attrs = winattr.getSync(windowsFile)
      return attrs.hidden
    }

    return path.basename(file).charAt(0) === '.'
  } catch (e) {
    console.log('isHidden error')
    console.log('file:', file)
    console.error(e)
  }
}
