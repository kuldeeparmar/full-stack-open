const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middlewares')


blogRouter.get('/',async (request,response) => {
  const result = await Blog.find({}).populate('user',{ username : 1 , name : 1 })
  response.json(result)
})


blogRouter.post('/',middleware.userExtractor ,async (request,response) => {

  const user = request.user

  if(!user) {
    return response.status(401).json({ error : 'user not found' })
  }

  const blog = {
    title : request.body.title,
    author : request.body.author,
    url : request.body.url,
    likes : request.body.likes || 0,
    user : user.id
  }

  const blogObject = new Blog(blog)
  const savedBlog = await blogObject.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id',middleware.userExtractor ,async (request,response) => {

  const user = request.user

  if(!(user)) {
    return response.status(401).json({
      error : 'user is not found'
    })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({
      error : 'unauthorized to delete the blog'
    })
  }

  await blog.deleteOne()
  response.status(200).end()
})

blogRouter.put('/:id',async (request,response) => {
  const blog = {
    title : request.body.title,
    author : request.body.author,
    url  : request.body.url,
    likes : request.body.likes
  }

  const updatedBlog  = await Blog.findByIdAndUpdate(request.params.id,blog,{ new : true ,context : 'query' })
  response.json(updatedBlog)
})

module.exports = blogRouter