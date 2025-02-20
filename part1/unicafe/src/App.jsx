import { useState } from 'react'

import Header from './Header'

import Button from './Button'

import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const heading = "Give Feedback"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <Header>{heading}</Header>
      <Button onClick={handleGood} text="good" />
      <br />
      <Button onClick={handleNeutral} text="neutral" />
      <br />
      <Button onClick={handleBad} text="bad" />
      <br />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App