const bodyParser = require('body-parser')
const authC = require('./passprot')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(authC.initialize())
}
