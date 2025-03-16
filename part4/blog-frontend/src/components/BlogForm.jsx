import { useState } from 'react'
const BlogForm = (props) => {
  const { createBlog } = props

  const [newBlog,setNewBlog] = useState({
    title : '',
    author : '',
    url : ''
  })

  const handleBlogFormSubmit = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ ...newBlog, title:'',author:'',url:'' })
  }

  return (
    <div>
      <h1>create blog</h1>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
          title
          <input value={newBlog.title} onChange={ ({ target }) => setNewBlog({ ...newBlog, title:target.value })}
          placeholder='blog title' data-testid='title'/>
        </div>
        <div>
          author
          <input value={newBlog.author} onChange={ ({ target }) => setNewBlog({ ...newBlog, author:target.value })}
          data-testid='author'/>
        </div>
        <div>
          url
          <input value={newBlog.url} onChange={ ({ target }) => setNewBlog({ ...newBlog, url:target.value })}
          data-testid='url'/>
        </div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default BlogForm