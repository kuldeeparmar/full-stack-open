const { test, after, beforeEach,describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')

const api = supertest(app)

beforeEach(async () => {
  // User intial data
  const saltRounds = 10
  await User.deleteMany({})

  for (let i = 0; i < helper.initialUser.length; i++) {
    helper.initialUser[i].passwordHash = await bcryptjs.hash(helper.initialUser[i].passwordHash,saltRounds)
    const userObject = new User(helper.initialUser[i])
    await userObject.save()
  }

  // // Blog initial data
  await Blog.deleteMany({})
  const users = await User.find({})
  for (let i = 0; i < helper.initialBlogs.length ; i++) {
    helper.initialBlogs[i].user = users[i]._id
    const blogObject = new Blog(helper.initialBlogs[i])
    await blogObject.save()
  }

  const blogs = await Blog.find({})

  for (let i=0;i<blogs.length;i++) {
    const user = await User.findById(blogs[i].user)
    user.blogs = user.blogs.concat(blogs[i]._id)
    await user.save()
  }



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

describe('for adding blog',() => {
  test('adding a new blog',async () => {
    const user = {
      username : helper.initialUser[0].username,
      password : helper.initialUser[0].passwordHash
    }
    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type',/application\/json/)

    const token = response.body.token

    const blog = {
      title : 'Entertain Videos',
      author : 'Dr. Janshi',
      url : 'http://www.janshimela.com',
      likes : 100
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization',`Bearer ${token}`)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    const blogs = await helper.blogInDB()
    assert.strictEqual(blogs.length,helper.initialBlogs.length+1)
  })

  test('invalid token',async () => {
    const blog = {
      title : 'History Run',
      author : 'Dr. Agra',
      url : 'http://www.chhaava.com',
      likes : 100
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set('Authorization','Bearer randomToken')
      .expect(401)

  })
})



after(async () => {
  await mongoose.connection.close()
})
