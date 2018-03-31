const auth = require('./authenticaition')
const express = require('express')

module.exports = app => {
  app.use(express.static('public'))
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'all is good' })
  })

  app.use('/auth', auth)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found')
    res.end()
  })
}
