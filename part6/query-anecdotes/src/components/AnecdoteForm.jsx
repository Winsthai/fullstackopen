import { addAnecdote } from "../requests"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      if (error.code === 'ERR_BAD_REQUEST') {
        notificationDispatch({ type: 'tooShortError' })
        setTimeout(() => {
          notificationDispatch({ type: 'clearNotification' })
        }, 5000)
      }
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'addNewAnecdote', content: content })
    setTimeout(() => {
      notificationDispatch({ type: 'clearNotification' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
