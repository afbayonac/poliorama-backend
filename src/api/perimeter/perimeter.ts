import { Router } from 'express'
import { getPerimeter, getPerimeters, createPerimeter, deletePerimeter } from './controller'
import { query, body } from 'express-validator'
import { jwtCheck } from '../middleware/jwt'
import validate from '../middleware/validate'
import moment = require('moment')

const perimeterRouter = Router()

perimeterRouter.route('/:id')
  .get(getPerimeter)
  .delete(
    jwtCheck(['god']),
    deletePerimeter
  )

perimeterRouter.route('/')
  .get(
    [
      query('limit').optional().isNumeric().toInt()
    ],
    validate,
    getPerimeters)
  .post(
    jwtCheck(['god', 'hunter', 'watchmen']),
    [
      body('name').isString(),
      body('lastName').isString(),
      body('birth')
        .optional()
        .isNumeric()
        .custom((value: string) => {
          moment(Number(value)).isBetween(moment('1900-01-01'), moment())
        })
        .withMessage('from 1990 to now'),
      body('description').isString(),
      body('twiter').optional().isString() // TODO valid with api 
    ],
    validate,
    createPerimeter)

export default perimeterRouter
