import { useState } from 'react'

import Header from './Header'

import Anecdotes from './Anecdotes'

import Button from './Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const anecdotesOfDay = "Anecdotes of the day"
  const mostLiked = "Anecdotes with most Likes";
  


   
  const [selected, setSelected] = useState(0)

  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0))

  console.log(selected);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1;
    setVotes(copy)
  }

  const indexOfMax = (arr) => {
    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}



  return (
    <div>

      <Header text={anecdotesOfDay} />

      <Anecdotes text={anecdotes[selected]} />
      
      <br />

      <Button handleClick={handleVoteClick} text={votes[selected] + " vote"} />

      <br />

      <Button handleClick={handleClick} text="next anecdote" />
      
      <Header text={mostLiked} />

      <Anecdotes text={anecdotes[indexOfMax(votes)]} />



    </div>
  )
}

export default App