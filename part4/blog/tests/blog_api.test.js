const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObject1 = new Blog(helper.initialBlogs[0])
  await blogObject1.save()
  const blogObject2 = new Blog(helper.initialBlogs[1])
  await blogObject2.save()
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

test('deletion of blog',async () => {
  const blogs = await helper.blogInDB()
  const blogsAtStart = blogs[0]

  await api
    .delete(`/api/blogs/${blogsAtStart.id}`)
    .expect(200)

  const blogAtEnd = await helper.blogInDB()

  const titles = blogAtEnd.map(r => r.title)

  assert(!titles.includes(blogsAtStart.title))

  assert.strictEqual(blogAtEnd.length,helper.initialBlogs.length-1)

})

test('updated a blog',async () => {
  const blogs = await helper.blogInDB()

  const blogsAtStart = blogs[0]

  blogsAtStart.likes = 55

  const response = await api
    .put(`/api/blogs/${blogsAtStart.id}`)
    .send(blogsAtStart)

  assert.deepStrictEqual(response.body,blogsAtStart)
})

test('invalid user',async () => {
  const user = {
    username : 'karan',
    name : 'arora',
    password : '12'
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type',/application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})
