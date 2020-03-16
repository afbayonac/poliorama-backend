import { Router } from 'express'
import { getPerimeter, getPerimeters } from './controller'
import { query } from 'express-validator'
import validate from '../middleware/validate'

const perimeterRouter = Router()

perimeterRouter.route('/:id')
  .get(getPerimeter)

perimeterRouter.route('/')
  .get(
    [
      query('limit').optional().isNumeric().toInt()
    ],
    validate,
    getPerimeters)

export default perimeterRouter
