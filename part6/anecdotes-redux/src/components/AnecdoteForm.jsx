import { useDispatch } from "react-redux"
import { handleCreateAnecdote } from "../reducers/anectodesReducer"

const AnecdoteForm = () => {
  const dispatcher = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content)
    event.target.anecdote.value = ''
    dispatcher(handleCreateAnecdote(content))

  }

  return (
    <div>
      <h2>create anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm