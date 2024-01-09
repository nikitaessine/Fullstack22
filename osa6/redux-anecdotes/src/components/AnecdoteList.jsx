import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteWithNotification } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(anecdote => 
      typeof anecdote.content === 'string' && anecdote.content.toLowerCase().includes(filter.toLowerCase())
    ).sort((a, b) => b.votes - a.votes)
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdoteWithNotification(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList