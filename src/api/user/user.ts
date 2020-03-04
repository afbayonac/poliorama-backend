import { Router } from 'express'
import { jwtCheck } from '../middleware/jwt'
import { getUser, getUserById } from './controller'

const userRouter = Router()

userRouter
  .route('/')
  .get(jwtCheck(), getUser)

userRouter
  .route('/:id')
  .get(jwtCheck(['god']), getUserById)

export default userRouter
