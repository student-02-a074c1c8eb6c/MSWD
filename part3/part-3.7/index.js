const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan("tiny"))

let persons = [
    {"name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
  

  ]
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })


  
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  app.post('/api/persons' , (request,response) => {
    const newEn = request.body

       if(!newEn.name)
      {
        
        response.status(400).json({error : "Name is missing"})
      }
      else if(!newEn.number)
      {
     
        response.status(400).json({error : "Number is missing"})
      }
      else if(persons.find(person => person.name === newEn.name))
      {
        response.status(409).json({error : "Name must be unique"})

      } 

      
       else if(newEn.name && newEn.number)
      {
          newEn.id = Math.floor(Math.random() * 10000000)
          response.status(201).json(newEn);
          persons = persons.response(concat);
      }
      else
      {
        response.status(500)
      }
  
      
    }
  
)
   

  app.get('/info',(request,response) => {
    const date = new Date();
    response.send(`<p> Phonebook has info for ${persons.length} people</p> <p> ${date} </p>`)
  })

  

const PORT =  8081
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

