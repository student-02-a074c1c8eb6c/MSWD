import React, { useState,useEffect } from 'react'
import PersonDetails from './components/PersonDetails'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'


const App = (props) => {
  const baseUrl = 'http://localhost:3001/persons'
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  

const Details=(event)=>{
  event.preventDefault()
  if(persons.find(persons=>persons.name===newName)){
    alert(newName+" is already added to the phonebook")
  }
  else if(persons.find(persons=>persons.number===newNumber)){
    alert(newNumber+" is already added to the phonebook")
  }
  else{
  const nameObject={
    name:newName,
    number:newNumber,
    id:persons.length+1
  }
  axios.post(baseUrl,nameObject)
      
      .then(response  => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
}
}
const hmChange=(event)=>{

  setNewName(event.target.value)
}
const heChangeNumber=(event)=>{

  setNewNumber(event.target.value)
}
const hmFilterChange = (e) => {
  setFilter(e.target.value)

}
const display=persons.filter((filtered)=>{
    if(filter==='')
    {
      return persons
    }
    else if(filtered.name.toLowerCase().includes(filter.toLowerCase()))  {
        return filtered
    }

  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={hmFilterChange}/>
      <PersonForm onSubmit={Details} valueName={newName} onChangeName={hmChange} valueNumber={newNumber} onChangeNumber={heChangeNumber}/>
      <h2>Numbers</h2>
       {display.map(person=>
        <PersonDetails key={person.id} person={person} />
        )}
    </div>
  )

}

export default App