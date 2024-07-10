import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const id = action.payload
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1
      }
      return state.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
    },

    addAnecdote(state, action) {
      const content = action.payload
      const id = getId()
      const newAnecdote = {
        id: id,
        content: content,
        votes: 0
      }
      return state.concat(newAnecdote)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {incrementVote, addAnecdote, setAnecdotes} = anecdotesSlice.actions
export default anecdotesSlice.reducer