const port = process.env.PORT || 8080
const express = require('express')
const app = express()

require('./config/db')()
require('./config/middleware')(app)
require('./config/routing')(app)

app.listen(port, () => {
  console.log(`im linstening on port ${port}`)
})
