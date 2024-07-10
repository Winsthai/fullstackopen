import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (content) => {
    const anecdote = {content, votes: 0}
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const incrementVote = async (id) => {
    const anecdote = await axios.get(`${baseUrl}/${id}`)
    const newAnecdote = {
        ...anecdote.data,
        votes: anecdote.data.votes += 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
    return response.data
}

export default { getAll, addAnecdote, incrementVote }