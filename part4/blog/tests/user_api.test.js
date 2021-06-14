const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const pwdH = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', pwdH })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const userstart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const end = await helper.usersInDb()
      expect(end).toHaveLength(userstart.length + 1)

      const usernames = end.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const userstart = await helper.usersInDb()

        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const end = await helper.usersInDb()
        expect(end).toHaveLength(userstart.length)
      })

      test('creation fails with proper statuscode and message if username too short', async () => {
        const userstart = await helper.usersInDb()

        const newUser = {
          username: 'ro',
          name: 'Superuser',
          password: 'salainen',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

        const end = await helper.usersInDb()
        expect(end).toHaveLength(userstart.length)
      })

      test('creation fails with proper statuscode and message if password too short', async () => {
        const userstart = await helper.usersInDb()

        const newUser = {
          username: 'test-user',
          name: 'Superuser',
          password: 'sa',
        }

        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

        const end = await helper.usersInDb()
        expect(end).toHaveLength(userstart.length)
      })

    afterAll(() => {
        mongoose.connection.close()
      })
  })
