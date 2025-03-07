const Blog = (props) => {
  const { blog } = props
  return (
    <>
      <div>
        <p>{blog.title}</p>
      </div>
    </>
  )
}

export default Blog