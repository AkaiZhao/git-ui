const db = require('../lowdb')
const { nanoid } = require('nanoid')

const getProjectName = (folder) => {
  try {
    const paths = folder.split('/')
    return paths[paths.length - 1]
  } catch (err) {
    console.log(err)
  }
  return ''
}

const getDBProjects = () => {
  return db.get('projects').value() || []
}

const saveProject = ({ name, path }) => {
  checkProjectExist(path)

  const id = nanoid(7)
  if (!name) name = getProjectName(path)
  const project = { id, name, path }
  db.get('projects').push(project).write()
}

const checkProjectExist = (newPath) => {
  const data = db.get('projects').value()
  const isExist = data.find(({ path }) => newPath === path)
  if (isExist) throw Error(`${newPath} is exist.`)
}

module.exports = {
  getProjectName,
  getDBProjects,
  saveProject
}
