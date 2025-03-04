const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request,response,next) => {
  response.status(404).json({
    error : 'Unknown Endpoint'
  })

  next()
}

const requestLogger = (request,response,next) => {
  logger.info('Methong ',request.method)
  logger.info('Path ',request.path)
  logger.info('body ',request.body)

  next()
}

const errorHandler = (error,request,response,next) => {
  logger.error(error)

  if(error.name === 'CastError') {
    return response.status(400).send({
      error : 'malformated id'
    })
  }
  else if(error.name === 'ValidationError') {
    return response.status(400).send({
      error : error.message
    })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error : 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error : 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

const tokenExtractor = (request,response,next) => {
  const authorization = request.get('authorization')

  if(authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ','')
  }

  next()
}

const userExtractor  = async (request,response,next) => {

  const authorization = request.get('authorization')

  if(authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ','')
    const decodedToken = jwt.verify(token,process.env.SECRET)

    if(!decodedToken.id) {
      return response.status(401).json({ error : 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(401).json({
        error : 'user not found'
      })
    }

    request.user = user
  }

  next()
}


module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor
}

