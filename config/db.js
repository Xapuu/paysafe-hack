const mongoose = require('mongoose')

const User = require('./../models/User')

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/demo-server-db')

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
