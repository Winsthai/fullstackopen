import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterName, setFilterName] = useState('')

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
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
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