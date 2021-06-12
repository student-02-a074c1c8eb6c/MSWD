require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const Person = require('./models/person')
const port = process.env.PORT

app.use(bodyParser.json())
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.static('build'))

app.get('/info', (req, res) => {
  Person.find({})
    .then(people => people ? people.length : 0)
    .then(entr => {
      const cT = new Date()
      const tx = `
        <p>Phonebook has info for ${entr} people</p>
        <p>${cT}</p>
      `
      res.send(tx)
    })
})

app.get('/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.get('/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch(error => next(error))
})

app.delete('/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(perremove => {
      perremove ? res.status(204).end() : res.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/persons/', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'missing name or number' })
  }

  const person = new Person({
    name,
    number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  const person = {
    name,
    number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updaper => {
      res.json(updaper)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'requested resource cannot be found' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error('Error:', error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT=3001
app.listen(PORT, () => {
  console.log(`Phonebook backend running on port ${PORT}`)
})
