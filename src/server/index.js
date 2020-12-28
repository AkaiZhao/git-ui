const express = require('express')
const chalk = require('chalk')
const execa = require('execa')

const app = express()

app.get('/read/git', async (req, res) => {
})

app.get('/git', async (req, res) => {
  try {
    const data = await execa('ls', ['/'], { cwd: process.cwd() })
    return res.json({
      data: data.stdout.split('\n')
    })
  } catch (err) {
    return res.status(500).json({
      message: 'error'
    })
  }
})

const projectRouter = require('./router/project')
app.use('/project', projectRouter)

const folderRouter = require('./router/folder')
app.use('/folder', folderRouter)

const server = require('./server-client')
server(app)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Ready on: ${chalk.cyan(`http://localhost:${port}`)} `)
})
