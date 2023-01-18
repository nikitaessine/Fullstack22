import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    console.log(newName)
    const inArray = persons.filter((person) => person.name === newName)
    if (inArray.length === 0){
      setPersons(persons.concat(personObject))
      setNewName('')
      console.log('button clicked', event.target)
    } else{
      alert(`${newName} is already in the phonebook`)
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person =>
            <Person key={person.name} person={person}/>)}
        </ul>
        <div>debug: {newName}</div>
    </div>
    
  )

}

export default App