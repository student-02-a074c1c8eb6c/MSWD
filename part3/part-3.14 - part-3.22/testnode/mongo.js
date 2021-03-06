
const mongoose = require('mongoose')
const [ , , password, name, number] = process.argv


if (!password) {
  console.log('missing password as argument')
  process.exit(1)
}

const url =
`mongodb+srv://fullstack:Password@cluster0.ryz57.mongodb.net/Phonebook?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true })
  .catch(error => console.error('DB connect error:', error))

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const find = () => {
  Person.find({}).then(res => {
    console.log('phonebook:')
    res.forEach(p => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
  })
}

const addPerson = () => {
  const person = new Person({
    name,
    number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

(name && number) ? addPerson() : find()
