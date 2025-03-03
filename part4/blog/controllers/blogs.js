const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/',async (request,response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogRouter.post('/',(request,response) => {

  if(!request.body.title || !request.body.author) {
    return response.status(400).end()
  }

  const blog = {
    title : request.body.title,
    author : request.body.author,
    url : request.body.url,
    likes : request.body.likes || 0
  }

  const blogObject = new Blog(blog)

  blogObject
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogRouter.delete('/:id', (request,response,next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(200).end()
    })
    .catch(error => {
      next(error)
    })
})

blogRouter.put('/:id',(request,response,next) => {
  const blog = {
    title : request.body.title,
    author : request.body.author,
    url  : request.body.url,
    likes : request.body.likes
  }

  Blog.findByIdAndUpdate(request.params.id,blog,{ new : true ,context : 'query' })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => {
      next(error)
    })

})

module.exports = blogRouter