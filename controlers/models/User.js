const mongoose = require('mongoose')
const encrypt = require('./../utils/crypto')

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true
  },
  balance: {
    type: mongoose.Schema.Types.Number,
    default: 0
  },
  salt: {
    type: mongoose.Schema.Types.String,
    default: encrypt.generateSalt(),
    required: true
  },
  hashedPass: { type: mongoose.Schema.Types.String, required: true }
})

userSchema.methods.authenticate = password =>
  this.hashedPass === encrypt.generateHashedPassword(this.salt, password)

userSchema.pre('save', function () {
  this.salt = encrypt.generateSalt()
  this.hashedPass = encrypt.generateHashedPassword(this.salt, this.hashedPass)
})

module.exports = mongoose.model('User', userSchema)
