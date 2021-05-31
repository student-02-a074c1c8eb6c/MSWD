import React, {useState} from 'react'

const Pers = ({ person }) => {
  return (
    <div>
      
      &nbsp;&nbsp;{person.content} 
      &nbsp;&nbsp;{person.number}

    </div>
  )
}

const App = (props) => {
  const [ persons, setPersons ] = useState(props.persons)
  const [ newName, setNewName ] = useState('')
  const [number, setNumber] = useState('')
  const [filt, setFilt] = useState('')
 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }
  const handleFiltChange = (e) => {
    setFilt(e.target.value)
   
  }

  const display = persons.filter((val) => 
  {
    if(filt===''){
      return persons
    }
    else if (val.content.toLowerCase().includes(filt.toLowerCase()))
    {
      return val
      
    }
  }
  
  )

  const addName = (event) => {
    event.preventDefault()
    if ( persons.find(person=>person.content===newName ) ) 
    {
      window.alert(newName + ' is already added to phonebook');
    }
  else
  {
    const nameObject = 
    {
      content: newName,
      number: number,
      id: persons.length + 1,
    }
  
  setPersons(persons.concat(nameObject))
  }
  
    setNewName('')  
    setNumber('')  
  
  
  }
  
  
  return (
    <div>
      <h2>&nbsp;&nbsp;Phonebook</h2>
      &nbsp;&nbsp;filter shown with&nbsp;<input type="text" onChange={handleFiltChange}/><br />
      <form onSubmit={addName}>
        <div>
          <h1>&nbsp;&nbsp;add a new</h1>
         &nbsp;&nbsp;&nbsp;name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input  value={newName} onChange={handleNameChange}/><br />
          <br></br>&nbsp;&nbsp;&nbsp;number: &nbsp;&nbsp;&nbsp;&nbsp; <input type='tel' pattern="[0-9\-]+" value={number} onChange={handleNumberChange}/>
        </div>
        <div>
        <br></br>&nbsp;&nbsp;&nbsp;<button type="submit">add</button>
        </div>
      </form>
      <h2>&nbsp;&nbsp;Numbers</h2>
      {display.map(person =>
          <Pers key={person.id} person={person} />
        )}
      

    </div>
  )
}

export default App