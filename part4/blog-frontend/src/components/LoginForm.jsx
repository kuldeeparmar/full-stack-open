import { useState } from 'react'

const LoginForm = (props) => {
  const { loginUser }  = props
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleLoginFormSubmit = (event) => {
    event.preventDefault()

    loginUser({
      username,
      password
    })

    setPassword('')
    setUsername('')
  }

  return (

    <form onSubmit={handleLoginFormSubmit}>
      <div>
          username
        <input value={username} onChange={ ({ target }) => setUsername(target.value) }/>
      </div>
      <div>
          password
        <input value={password} onChange={ ({ target }) => setPassword(target.value) }/>
      </div>
      <button type="submit" >login</button>
    </form>

  )
}

export default LoginForm