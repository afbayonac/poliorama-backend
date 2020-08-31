import { Router } from 'express'
import { getSubject, getSubjects, createSubject, deleteSubject } from './controller'
import { query, body } from 'express-validator'
import { jwtCheck } from '../middleware/jwt'
import validate from '../middleware/validate'
import moment from 'moment'

const subjectRouter = Router()

subjectRouter.route('/:id')
  .get(getSubject)
  .delete(
    jwtCheck(['god']),
    deleteSubject
  )

subjectRouter.route('/')
  .get(
    [
      query('limit').optional().isNumeric().toInt()
    ],
    validate,
    getSubjects)
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
    createSubject)

export default subjectRouter
