import { incrementVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './Filter'
import Notification from './Notification'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === 'NO_FILTER') {
            return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
        }
        return [...state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))].sort((a, b) => b.votes - a.votes)
    })
    
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(incrementVote(id))
    }

    return (
        <>
            <h2>Anecdotes</h2>
            <Notification></Notification> 
            <br/>
            <Filter></Filter>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AnecdoteList