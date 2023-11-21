import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Persons = ({persons, filterName}) => {
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map(person => 
        <div key={person.id}>{person.name} {person.number}</div>
        )}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')

  const url = 'http://localhost:3001/persons'

  // Second parameter being an empty array [] means that the effect is only run along with the first render of the component
  useEffect(() => {
    axios
      .get(url)
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
    else if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNum,
      }
      axios
        .post(url, personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filterName={handleFilterChange}></Filter>

      <h2>Add a new person</h2>
      
      <PersonForm person={addPerson} name={handleNameChange} number={handleNumChange}></PersonForm>

      <h2>Numbers</h2>
      
      <Persons persons={persons} filterName={filterName}></Persons>
    </div>
  )
}

export default App