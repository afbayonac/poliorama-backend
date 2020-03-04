import db from '../../database'
import { Request, Response } from 'express'

export const getPerimeter = (req: Request, res: Response): Response => {
  return res.status(418).json({ message: 'endpoint under construction  🚧' })
}
