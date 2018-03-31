const User = require('mongoose').model('User')
const encrypt = require('./../utils/crypto')
const tokenConfig = require('./../config/token.config')

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
    res.status(404).send('Password dosent match').end()
    return
  }

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


  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return
    }

    if (!user) {
      res.status(200).send({ message: 'No such user' }).end()
      return
    }

    if (
      encrypt.generateHashedPassword(user.salt, req.body.password) !==
      user.hashedPass
    ) {
      res.status(404).send('Password dosent match').end()
      return
    }
    const token = jwt.encode(user.id, tokenConfig.jwtSecret)

    res.json({
      token
    })

    res.end()
  })
}

const demo = (req, res) => {
  res.status('200').send({ allIsGood: 'ok' })
  res.end()
}

module.exports = {
  register,
  login,
  demo
}
