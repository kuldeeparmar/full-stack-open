const Blog = require('../models/blog')

const initialBlogs = [
  {
    title : 'Mental Fittenest',
    author : 'Dr.Lalu',
    url : 'http://www.lalu.com',
    likes : 10
  },
  {
    title : 'Finance Advise',
    author : 'Mr. Lally',
    url : 'http://myfinanceadvise.com',
    likes : 11
  }
]

const blogInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(r => r.toJSON())
}


module.exports = {
  initialBlogs,
  blogInDB
}