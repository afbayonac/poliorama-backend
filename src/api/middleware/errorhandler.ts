import { ErrorRequestHandler } from 'express'
import logger from '../../logger'
import { JsonWebTokenError } from 'jsonwebtoken'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof JsonWebTokenError) {
    logger.err('JWT error', err.message)
    switch (err.message) {
      case 'permission enough':
        return res.status(401).json({ message: 'you do not have required permissions' })
      case 'invalid signature':
        return res.status(401).json({ message: 'invalid token' })
      case 'invalid format auhorization':
        return res.status(400).json({ message: 'invalid format token' })
      case 'no found token':
        return res.status(401).json({ message: 'unauthorized' })
    }
  }

  if (err.isArangoError) {
    logger.err(err.message)
    switch (err.code) {
      case 404:
        return res.status(404).json({ message: 'resource no found' })
    }
  }

  // pass error to next error handler
  next(err)
}

export default errorHandler
