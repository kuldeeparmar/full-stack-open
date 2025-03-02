const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const cors = require('cors')
const middleware = require('./utils/middlewares')
const blogRouter = require('./controllers/blogs')


mongoose.set('strictQuery',false)

logger.info('Connecting to database',config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to database')
  })
  .catch(error => {
    logger.error(error)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs',blogRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app




