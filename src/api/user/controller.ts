import db from '../../database'
import { Request, Response } from 'express'

export const getUserById = (req: Request, res: Response): Response => {
  return res.status(418).json({ message: 'endpoint under construction  🚧' })
}

export const getUser = (req: Request, res: Response): Response => {
  return res.status(418).json({ message: 'endpoint under construction  🚧' })
}
