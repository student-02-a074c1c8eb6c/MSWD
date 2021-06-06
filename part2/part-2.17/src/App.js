import React,{useState,useEffect} from "react";
import noteService from './services/person'
import PersonDetails from './components/PersonDetails'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    console.log('effect')
    
      noteService.getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
        console.log(response)
      })
  }, [])

const addDetails=(event)=>{
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
  }
   noteService.create(nameObject)
   .then(response=>{
  setPersons(persons.concat(response))
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
const haFilterChange = (e) => {
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
    else{
      return null;
    }
  })
  const removePerson = (id, name) => {
    if ( window.confirm(`Delete ${name} ?`)) {
      noteService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
   
    } else {
      return;
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={haFilterChange}/>
      <PersonForm onSubmit={addDetails} valueName={newName} onChangeName={hmChange} valueNumber={newNumber} onChangeNumber={heChangeNumber}/>
      <h2>Numbers</h2>
       {display.map(person=>
        <PersonDetails key={person.id} person={person}  removePerson={removePerson}/>
        )}
    </div>
  )


}
export default App