const mongoose = require('mongoose')

const User = require('./../models/User')

module.exports = () => {
  // mongoose.connect('mongodb://localhost:27017/demo-server-db')
  mongoose.connect(
    'mongodb://admin:admin@ds229909.mlab.com:29909/pay-safe-hack'
  )

  const db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('Db connected')
  })

  db.on('error', reason => {
    console.log(reason)
  })
}
