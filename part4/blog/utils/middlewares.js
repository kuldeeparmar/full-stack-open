const logger = require('./logger')

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
  }

  next(error)
}


module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint
}

