import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'

const validateRules: RequestHandler = (req, res, next) => {
  const errors = validationResult(req)

  if (errors.isEmpty()) {
    return next()
  }

  return res.status(422).json({ errors: errors.array() })
}

export default validateRules
