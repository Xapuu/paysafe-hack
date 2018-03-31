const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const User = require('mongoose').model('User')

const config = {
  jwtSecret: 'MyS3cr3tK3Y',
  jwtSession: {
    session: false
  }
}
const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
}

module.exports = (function () {
  var strategy = new Strategy(params, function (payload, done) {
    var user = User.findOne(payload.id)
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
      return passport.authenticate('jwt', config.jwtSession)
    }
  }
})()
