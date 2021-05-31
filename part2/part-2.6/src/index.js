import ReactDOM from 'react-dom'
import App from './App.js'
import './index.css'

const persons = [
  {
    id: 11,
    content: 'Arto Hellas'

  }
  ,
  {
    id: 13,
    content: 'Ada lovelace' 
  }
]
ReactDOM.render(<App persons={persons}/>,
  document.getElementById('root'))