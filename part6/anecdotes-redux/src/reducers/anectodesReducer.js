const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (Math.random() * 1000 ).toFixed(0)

export const anecdotesObject = (content) => {
  return {
    content : content,
    id : getId(),
    vote : 0
  }
}

export const handleVoteClick = (id) => {
  return {
    type : 'VOTE',
    payload : { id }
  }
}

export const handleCreateAnecdote = (content) => {
  return {
    type : 'ADD',
    payload : {
      content: content,
      id : getId(),
      vote : 0
    }
  }
}

const initialState = anecdotesAtStart.map(anecdotesObject)

const anecdotesReducer = (state = initialState,action) => {
  
  switch (action.type) {
    case 'VOTE': {
      const id = action.payload.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange,vote : anecdoteToChange.vote + 1 }
      return state.map(a => a.id === id ? changedAnecdote : a)
    }
    case 'ADD':
      return [...state,action.payload]
    default:
      return state
  }
}

export default anecdotesReducer