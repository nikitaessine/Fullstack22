import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('fulfilled')
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(newName)
    const inArray = persons.filter((person) => person.name === newName)
    if (inArray.length === 0){
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccessMessage(
            `Added ${personObject.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')    
        })
      console.log('button clicked', event.target)
    } else{
      alert(`${newName} is already in the phonebook`)
    }
  }

  const deletePerson = (person) => {
    const persontodelete = person.name
    if (window.confirm(`Delete ${persontodelete}?`)){
      personService
      .remove(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        setSuccessMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
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
      <Notification message={successMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

      <h2>add new</h2>
      <NewPersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>

      <Person filteredPersons={filteredPersons} deletePerson={deletePerson}/>
        <div>debug: {newName}</div>
        <div>debug: {newNumber}</div>
    </div>
    
  )

}

export default App