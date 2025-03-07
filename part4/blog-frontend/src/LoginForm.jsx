const LoginForm = (props) => {
  const { username, password, setPassword, setUsername, handleLoginFormSubmit, loginVisible ,
    setLoginVisible
   }  = props

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