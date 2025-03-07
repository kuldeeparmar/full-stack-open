import { useState } from "react"
import { useEffect } from "react"
import blogServices from './services/blogs'
import Blog from "./Blog"
import LoginForm from "./LoginForm"
import loginServices from './services/login'
import BlogForm from "./BlogForm"
import Notification from "./Notification"

function App() {

  const [blogs,setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [newBlog,setNewBlog] = useState({
    title : '',
    author : '',
    url : ''
  }) 
  const [errorMessage,setErrorMessage] = useState(null)
  const [loginVisible,setLoginVisible] = useState(false)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const getAllBlogs = await blogServices.getAll();
        setBlogs(getAllBlogs)
      } catch (error) {
        console.error('Error while fetch blog',error)
      }
    }
    
    fetchData()

  },[])

  useEffect(() => {
    let loggedInUser = window.localStorage.getItem('loggedBlogAppUser')

    if(loggedInUser) {
      loggedInUser = JSON.parse(loggedInUser)
      blogServices.setToken(loggedInUser.token)
      setUser(loggedInUser)
    }

  },[])


  const handleLoginFormSubmit = async (event) => {
    event.preventDefault()

    try {
      const result = await loginServices.login({username,password})
      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(result))
      blogServices.setToken(result.token)
      setUser(result)
      setPassword('')
      setUsername('')
    } catch(error) {
      console.error('Error while Login',error)
      const message = `Error while login ${error.response.data.error}`
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      },4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleBlogFormSubmit  = async (event) => {
    event.preventDefault()

    try {
      const result = await blogServices.create(newBlog)
      setNewBlog({ ...newBlog, title:'',author:'',url:'' })
      setBlogs(blogs.concat(result))
      const message = `new blog ${result.title} is added, whose author is ${result.author}`
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      },4000)

    } catch (error) {
      console.error('Error while posting Blog',error)
      const message = `Error while posting Blog ${error.message}`
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      },4000)
    }
  }

  return (
    <>
      {errorMessage != null && <Notification errorMessage={errorMessage} />}
      { user == null 
      ? <LoginForm username={username} password={password}  setPassword={setPassword} 
          setUsername={setUsername} handleLoginFormSubmit={handleLoginFormSubmit} 
          loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>
      : <div>
          <h1>blogs</h1>
          <div>
            {user.name} is logged-in
            <button onClick={handleLogout}>logout</button>
          </div>
          <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} handleBlogFormSubmit={handleBlogFormSubmit}/>
          {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
      }
    </>
  )
}

export default App
