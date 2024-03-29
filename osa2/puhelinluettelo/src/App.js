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
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(data => {
        console.log('fulfilled')
        console.log(data)
        setPersons(data)
      })
  }, [])

  const filteredPersons = persons.filter(person => 
      person.content.toLowerCase().includes(newFilter.toLowerCase())
  )

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

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(person => person.content === newName)
    if (exists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        {
          const updatedObject = {
            content: newName,
            number: newNumber,
            id: exists.id
          }
          personService
            .update(`${exists.id}`, updatedObject)
            .catch(error => {
              setErrorMessage(`Information of ${newName} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
              setPersons(persons.filter(p => p.id !== exists.id))
            })
            .then(response => {
              setPersons(persons.map(p => p.id !== exists.id ? p : response))
              setSuccessMessage(`Changed the number of ${newName} to ${newNumber}`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 3000)
              setNewName('')
              setNewNumber('')   
            })
        }
    }else{ 
    const personObject = {
      content: newName,
      number: newNumber
    }
    console.log(newName)
    const inArray = persons.filter((person) => person.content === newName)
    if (inArray.length === 0){
      personService
        .create(personObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response))
          setSuccessMessage(
            `Added ${personObject.content}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)    
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
      console.log('button clicked', event.target)
    } 
  }
  setNewName('')
  setNewNumber('')
}

  const deletePerson = (person) => {
    const persontodelete = person.content
    if (window.confirm(`Delete ${persontodelete}?`)){
      personService
      .remove(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        setSuccessMessage(
          `Deleted ${person.content}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type='error'/>
      <Notification message={successMessage} type='success'/>
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