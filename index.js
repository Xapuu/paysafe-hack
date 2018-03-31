const port = process.env.PORT || 8080

const express = require('express')
const bodyParser = require('body-parser')

const db = require('./config/db')
db()
const authC = require('./config/passprot')

const app = express()

const auth = require('./config/routing/authenticaition')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(authC.initialize())

app.use(express.static('public'))

app.use('/auth', auth)

app.get('/', (req, res) => {
  res.status(200).send({ message: 'all is good' })
})

app.listen(port, () => {
  console.log(`im linstening on port ${port}`)
})
