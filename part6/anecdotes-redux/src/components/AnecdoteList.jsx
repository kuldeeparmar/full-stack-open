import { useSelector,useDispatch } from "react-redux"
import { handleVoteClick } from "../reducers/anectodesReducer"

const Anecdote = (props) => {
  const { incrementVote, anecdote } = props
  return (
    <div key={anecdote.id}>
      <div>
      {anecdote.content}
      </div>
      <div>
      has {anecdote.vote}
      <button onClick={() => incrementVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter,anecdotes}) => {
    return anecdotes.filter(a => a.content.includes(filter))
  })
  
  const dispatcher = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a,b) => b.vote - a.vote)

  const incrementVote = (id) => {
    dispatcher(handleVoteClick(id))
  }

  return (
    <div>
      {sortedAnecdotes.map(
        anecdote => 
          <Anecdote key={anecdote.id} anecdote={anecdote} incrementVote={incrementVote}/>
      )}
    </div>    
  )
}

export default AnecdoteList