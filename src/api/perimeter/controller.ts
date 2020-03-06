import db from '../../database'
import { RequestHandler } from 'express'

const perimetersCollection = db.collection('perimeters')

export const getPerimeter: RequestHandler = async (req, res, next) => {
  // TODO: validate params
  const key = req.params.id
  try {
    const perimeter = await perimetersCollection.document(key)
    return res.status(200).json(perimeter)
  } catch (e) { next(e) }
}
