const byt = require('bcrypt')
const userrou = require('express').Router()
const User = require('../models/user')

userrou.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).json({ error: `User validation failed: username: Path password is shorter than the minimum allowed length (3)` })
  }

  const saroun = 10
  const pwdH = await byt.hash(body.password, saroun)

  const user = new User({
    username: body.username,
    name: body.name,
    pwdH,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

userrou.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(user => user.toJSON()))
  })

module.exports = userrou
