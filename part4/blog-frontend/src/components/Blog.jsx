import { useState } from 'react'

const Blog = (props) => {
  const { blog,handleLikeUpdate,userUsername,handleBlogDelete } = props

  const [view,setView] = useState(false)
  const showWhenView = { 'display' : view ? '' : 'none' }
  // console.log(`${blog.user.username} ${userUsername}`)

  const blogStyle = {
    paddingLeft : 10,
    border : 'solid',
    borderWidth : 1
  }

  return (
    <>
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button  onClick={() => setView(!view)}>{view ? 'hide' : 'view'}</button>
        </div>
        <div style={showWhenView} className='toggleDetails'> 
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}
            <button onClick={() => handleLikeUpdate(blog.id)}>like</button>
          </p>
          <p>{blog.author}</p>
          {blog.user.username === userUsername && <button onClick={() => handleBlogDelete(blog.id)}>remove</button> }
        </div>
      </div>
    </>
  )
}

export default Blog