import { useDispatch, useSelector } from "react-redux"
import { handleCreateAnecdote, handleVoteClick } from "./reducers/anectodesReducer"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"

const App = () => {
  
  return (
    <div>
      <h1>Anecdotes</h1>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App