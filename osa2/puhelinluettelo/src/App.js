import { useState } from 'react'
import Person from './components/Person'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(newName)
    const inArray = persons.filter((person) => person.name === newName)
    if (inArray.length === 0){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log('button clicked', event.target)
    } else{
      alert(`${newName} is already in the phonebook`)
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          filter shown with: <input 
          value={newFilter}
          onChange={handleFilterChange}/>
        </div>
      </form>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>number: <input
          value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <Person filteredPersons={filteredPersons}/>
        <div>debug: {newName}</div>
        <div>debug: {newNumber}</div>
    </div>
    
  )

}

export default App