import { useRef, useState } from 'react'
import { useEffect } from 'react'
import blogServices from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import loginServices from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

function App() {

  const [blogs,setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)
  const blogFormRef = useRef(null)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const getAllBlogs = await blogServices.getAll()
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


  const handleLoginFormSubmit = async ({ username,password }) => {

    try {
      const result = await loginServices.login({ username,password })
      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(result))
      blogServices.setToken(result.token)
      setUser(result)
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
    blogServices.setToken('')
    setUser(null)
  }

  const handleBlogFormSubmit  = async (blogObject) => {


    try {

      const result = await blogServices.create(blogObject)
      blogFormRef.current.toggleVisiblity()
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

  const handleLikeUpdate = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog,likes : blog.likes + 1 }

    const result = await blogServices.update(id,changedBlog)
    setBlogs(blogs.map(blog => blog.id === id ? result : blog))
  }

  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes)

  const handleBlogDelete = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const message = `Remove blog ${blog.title} by ${blog.author}`
    if(window.confirm(message)) {
      try {
        const result = await blogServices.deleteBlog(id)
        console.log(result)
        setBlogs((prevBlogs) => prevBlogs.filter(blog => blog.id !== id))
      } catch(error) {
        console.error('Error while deleting blog',error)
      }

    }
  }



  return (
    <>
      {errorMessage !== null && <Notification errorMessage={errorMessage} />}
      { user === null
        ? <Togglable buttonLabel="login" >
          <LoginForm loginUser={handleLoginFormSubmit} />
        </Togglable>
        : <div>
          <h1>blogs</h1>
          <div>
            {user.name} is logged-in
            <button onClick={handleLogout}>logout</button>
          </div>

          <Togglable buttonLabel="new blog" ref={blogFormRef} >
            <BlogForm createBlog={handleBlogFormSubmit}/>
          </Togglable>
          {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} handleLikeUpdate={handleLikeUpdate}
            userUsername={user.username} handleBlogDelete={handleBlogDelete}/>)}
        </div>
      }
    </>
  )
}

export default App
