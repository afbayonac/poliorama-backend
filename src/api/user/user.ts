import { Router, Request, Response } from 'express'
import { jwtCheck } from '../middleware/jwt'

const userRouter = Router()

userRouter
  .route('/')
  .get(jwtCheck(['god']), (req: Request, res: Response) => res.json({ user: 'the_user' } ))

export default userRouter
