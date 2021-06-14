const jeken = require('jsonwebtoken')
const byt = require('bcrypt')
const login = require('express').Router()
const User = require('../models/user')

login.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const pwdcor = user === null
    ? false
    : await byt.compare(body.password, user.passwordHash)

  if (!(user && pwdcor)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userto = {
    username: user.username,
    id: user._id,
  }

  const tn = jeken.sign(userto, process.env.SECRET)

  response
    .status(200)
    .send({ tn, username: user.username, name: user.name })
})

module.exports = login
