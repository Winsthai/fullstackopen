import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, incrementVote } from './requests'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const App = () => {

  const queryClient = useQueryClient()

  const incrementVoteMutation = useMutation({
    mutationFn: incrementVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    incrementVoteMutation.mutate({ ...anecdote, votes: anecdote.votes += 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })
  //console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>anecdote service is not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
