import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filterName}) => {
  return (
    <div>
      filter by name: <input onChange={filterName}></input>
  </div>
  )
}

const PersonForm = ({person, name, number}) => {
  return (
    <form onSubmit={person}>
      <div>
        name: <input onChange={name}/>
      </div>
      <div>
        number: <input onChange={number}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, filterName, handleDeletePerson}) => {

  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(person => 
        <div key={person.id}>
          {person.name} {person.number} &nbsp; 
            <button onClick={() => {if (confirm(`Delete ${person.name}?`)) {handleDeletePerson(person.id)}}} >delete</button>
        </div>
        )}
    </>
  )
}

const Notification = ({successMessage, errorMessage}) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }
  else if (errorMessage === null) {
    return (
      <div className='success'>
        {successMessage}
      </div>
    )
  }
  else {
    return (
      <div className='error'>
        {errorMessage}
      </div>
    )
  }

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Second parameter being an empty array [] means that the effect is only run along with the first render of the component
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('Please enter a name')
    }
    else if (newNum === '') {
      alert('Please enter a number')
    }

    // If name already exists
    else if (persons.some(person => person.name === newName)) {
      const person = persons.find(person => person.name === newName)

      if (confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const personObject = {
          name: newName,
          number: newNum
        }
  
        const personId = person.id
  
        personService
          .updateNumber(personId, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id === personId ? response.data : person))
            setSuccessMessage(`Changed ${person.name}'s number`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${person.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }

    else {
      const personObject = {
        name: newName,
        number: newNum,
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleDeletePerson = (personId) => {
    personService
      .deletePerson(personId)
      .then(() => {
        setPersons(persons.filter(person => person.id != personId))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}></Notification>
      <Filter filterName={handleFilterChange}></Filter>

      <h2>Add a new person</h2>
      
      <PersonForm person={addPerson} name={handleNameChange} number={handleNumChange}></PersonForm>

      <h2>Numbers</h2>
      
      <Persons persons={persons} filterName={filterName} handleDeletePerson={handleDeletePerson}></Persons>
    </div>
  )
}

export default App