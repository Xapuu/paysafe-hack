const passport = require('passport')
const passportJWT = require('passport-jwt')
const tokenConfig = require('./token.config')
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const User = require('mongoose').model('User')

const params = {
  secretOrKey: tokenConfig.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
}

module.exports = (function () {
  const strategy = new Strategy(params, function (payload, done) {
    const user = User.findOne(payload.id)
    if (user) {
      return done(null, {
        id: user.id
      })
    } else {
      return done(new Error('User not found'), null)
    }
  })
  passport.use(strategy)
  return {
    initialize: function () {
      return passport.initialize()
    },
    authenticate: function () {
      return passport.authenticate('jwt', tokenConfig.jwtSession)
    }
  }
})()
