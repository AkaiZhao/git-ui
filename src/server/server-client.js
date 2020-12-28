const express = require('express')
const path = require('path')
const fallback = require('express-history-api-fallback')
const CACHE_CONTROL = 'no-store, no-cache, must-revalidate, private'
const distPath = path.resolve(__dirname, '../ui/dist')

module.exports = (app) => {
  app.use(express.static(distPath, { setHeaders }))
  app.use(fallback(path.join(distPath, 'index.html'), {
    headers: {
      'Cache-Control': CACHE_CONTROL
    }
  }))
}

function setHeaders (res) {
  res.set('Cache-Control', CACHE_CONTROL)
}
