import db from '../../database'
import { RequestHandler } from 'express'

const usersCollection = db.collection('users')

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await usersCollection.document(res.locals.decodeToken._key)
    return res.status(200).json(user)
  } catch (e) { next(e) }
}

export const getUserById: RequestHandler = async (req, res, next) => {
  // TODO: validate Id
  const key = req.params.id
  try {
    const user = await usersCollection.document(key)
    return res.status(200).json(user)
  } catch (e) { next(e) }
}
