const express = require('express')
const chalk = require('chalk')

const app = express()

const projectRouter = require('./router/project')
app.use('/project', projectRouter)

const folderRouter = require('./router/folder')
app.use('/folder', folderRouter)

const gitRouter = require('./router/git')
app.use('/git', gitRouter)

const server = require('./server-client')
server(app)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Ready on: ${chalk.cyan(`http://localhost:${port}`)} `)
})
app.on('error', () => {
  console.log('error')
})
