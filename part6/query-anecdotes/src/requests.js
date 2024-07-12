import axios from "axios"

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => axios.get(baseURL).then(res => res.data)

export const addAnecdote = (newAnecdote) => axios.post(baseURL, newAnecdote).then(res => res.data)

export const incrementVote = (newAnecdote) => axios.put(`${baseURL}/${newAnecdote.id}`, newAnecdote).then(res => res.data)