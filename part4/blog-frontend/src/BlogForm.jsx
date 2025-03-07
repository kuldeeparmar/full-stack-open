const BlogForm = (props) => {
  const { newBlog , setNewBlog,handleBlogFormSubmit} = props
  return (
    <div>
      <h1>create blog</h1>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
          title 
          <input value={newBlog.title} onChange={ ({target}) => setNewBlog({...newBlog, title:target.value})}/>
        </div>
        <div>
          author 
          <input value={newBlog.author} onChange={ ({target}) => setNewBlog({...newBlog, author:target.value})}/>
        </div>
        <div>
          url 
          <input value={newBlog.url} onChange={ ({target}) => setNewBlog({...newBlog, url:target.value})}/>
        </div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default BlogForm