const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const cors = require('cors')
const middleware = require('./utils/middlewares')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRoute = require('./controllers/login')

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
app.use('/api/users',userRouter)
app.use('/api/login',loginRoute)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app




