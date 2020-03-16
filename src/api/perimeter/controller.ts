import db from '../../database'
import { aql } from 'arangojs'
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

export const getPerimeters: RequestHandler = async (req, res, next) => {
  // TODO: validate params
  const limit = req.query.limit || 1000
  try {
    // validationResult(req).throw()
    const cursor = await db.query(aql`
      FOR perimeter IN perimeters
      LIMIT ${limit}
      RETURN perimeter
    `)
    const data = await cursor.all()
    return res.status(200).json(data)
  } catch (e) { next(e) }
}
