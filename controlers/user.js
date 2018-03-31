const User = require('mongoose').model('User')

var jwt = require('jwt-simple')

const validateRequest = (reqProps, body) =>
  reqProps.some(x => body[x] === undefined)

const register = (req, res) => {
  const body = req.body
  const requiredData = ['username', 'password', 'confirmPassword']

  let isInvalidReq = validateRequest(requiredData, req.body)

  if (isInvalidReq) {
    res
      .status(404)
      .send(`Missing params, the needed params are ` + requiredData.join(', '))
    return
  }

  if (body.password !== body.confirmPassword) {
    res.status(404).send('Password dosent match')
  }
  console.log(body)
  User.create({
    username: body.username,
    hashedPass: body.password
  })
    .then(user => {
      res.status(200).send(user)
    })
    .catch(err => {
      res.status(404).send(err.message)
    })
}

const login = (req, res) => {
  console.log('in login')

  const config = {
    jwtSecret: 'MyS3cr3tK3Y',
    jwtSession: {
      session: false
    }
  }

  let id = 'zzzzzzzzzzzz'
  let id2 = 'dsadasdas'

  const token = jwt.encode(id, config.jwtSecret)
  const token2 = jwt.encode(id2, config.jwtSecret)

  res.json({
    token,
    token2
  })

  res.end()
}

const demo = (req, res) => {
  console.log(req.body)

  res.status('200').send({ allIsGood: 'ok' })
  res.end()
}

module.exports = {
  register,
  login,
  demo
}
