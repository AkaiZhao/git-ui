const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const adapter = new FileSync(path.resolve(__dirname, '.storage.json'))
const db = low(adapter)

db.defaults({
  projects: [],
  config: {}
})
  .write()

module.exports = db
