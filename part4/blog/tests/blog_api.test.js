const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blog = [
    {
      title : 'Mental Fittenest',
      author : 'Dr.Lalu',
      url : 'http://www.lalu.com',
      likes : 10
    }
  ]

  const blogObject = new Blog(blog[0])

  await blogObject.save()

})

test('return blog is json',async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('unique property of blog post id',async () => {
  const response = await api
    .get('/api/blogs')

  const blogsAtStart = response.body[0]
  console.log(blogsAtStart)
})

test('posting a blog to api',async () => {
  const blog = {
    title : 'Fitteness Exercise',
    author : 'Lady fit',
    url : 'http://fitfit.com',
    likes : 1000
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type',/application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length,2)

  assert(titles.includes('Fitteness Exercise'))

})

test('testing the property likes', async () => {
  const blog = {
    title : 'Entertainment Story',
    author : 'Ft. Lee',
    url : 'http://enterstory.com'
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type',/application\/json/)
})

test('test for title or author missing',async () => {
  const blog = {
    author : 'Ft. Lee',
    url : 'http://enterstory.com'
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

})

after(async () => {
  await mongoose.connection.close()
})
