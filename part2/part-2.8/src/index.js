import ReactDOM from 'react-dom'
import App from './App.js'
import './index.css'

const persons = [
  {
    id: 11,
    content: 'Arto Hellas',
    number: '040-1234567'

  }
 
]
ReactDOM.render(<App persons={persons}/>,
  document.getElementById('root'))