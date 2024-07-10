import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { removeNotification, setNotification } from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'

var timeoutId = undefined

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        const newAnecdote = await anecdotes.addAnecdote(content)
        console.log(newAnecdote)
        dispatch(addAnecdote(newAnecdote)) 
        dispatch(setNotification(`new anecdote '${content}' created`))
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div><input name='content' /></div>
                <button type='submit' >create</button>
            </form>
        </>
    )
}

export default AnecdoteForm