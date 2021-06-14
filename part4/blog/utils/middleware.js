const logger = require('./logger')
const jwt = require('jsonwebtoken')

const errorhan = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
          error: 'invalid token'
        })
    }

    logger.error(error.message)
    next(error)
}

const tokenex = (request, response, next) => {
    const autho = request.get('autho')

    if (autho && autho.toLowerCase().startsWith('bearer ')) {
        request["token"] = autho.substring(7)
    }
    next()
  }

const valid = (request, response, next) => {
    const token = request.token
    if (!token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const decode = jwt.verify(token, process.env.SECRET)
    if (!decode.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    next()
}

module.exports = { errorhan, tokenex, valid }
