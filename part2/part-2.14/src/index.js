import ReactDOM from 'react-dom'
import App from './App.js'
import './index.css'

const persons = [
  {
    id: 11,
    content: 'Arto Hellas',
    number: '040-1234567'

  },
  {
    id: 12,
    content: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {  
    id: 13,
    content: 'Dan Abramov', 
    number: '12-43-234345' 
  },
  { 
    id: 14,
    content: 'Mary Poppendieck', 
    number: '39-23-6423122' 
  }
 
]
ReactDOM.render(<App persons={persons}/>,
  document.getElementById('root'))