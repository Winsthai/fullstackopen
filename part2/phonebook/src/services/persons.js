import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

// Used to get all people currently stored
const getAll = () => {
    return axios.get(baseUrl)
}

// Used to create a new person
const create = personObject => {
    return axios.post(baseUrl, personObject)
}

// Used to delete an existing person
const deletePerson = personId => {
    return axios.delete(`${baseUrl}/${personId}`)
}

// Used to update an existing person's number
const updateNumber = (personId, newObject) => {
    return axios.put(`${baseUrl}/${personId}`, newObject)
}

export default {getAll, create, deletePerson, updateNumber}