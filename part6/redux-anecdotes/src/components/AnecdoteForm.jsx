import { addAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(addAnecdote(content))
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