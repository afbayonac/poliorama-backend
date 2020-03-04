import db from '../../database'
import { Request, Response } from 'express'

export const getPerimeter = async (req: Request, res: Response): Promise<Response> => {
  const key = req.params.id
  console.log(key)
  try {

    const perimeter = await db.collection('perimeters').document(key)
    console.log(perimeter)
    return res.status(200).json(perimeter)
  } catch (e) {
    if (e.isArangoError && e.code === 404) {
      return res.status(404).json({ message: 'resource no found' })
    }
    throw e
  }
}
