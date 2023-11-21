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

export default {getAll, create}