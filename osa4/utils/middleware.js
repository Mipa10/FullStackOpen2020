const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)
    if (err.name === 'ValidationError') {
        return res.status(400).json({error: err.message})
    }
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    next()

}

module.exports = {errorHandler, requestLogger, tokenExtractor}