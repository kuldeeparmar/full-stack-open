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

module.exports = blogRouter