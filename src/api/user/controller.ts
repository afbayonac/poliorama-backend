import db from '../../database'
import { RequestHandler } from 'express'
import { decode } from '../middleware/jwt'

const usersCollection = db.collection('users')

export const getUser: RequestHandler = async (req, res) => {
  const user = await usersCollection.document(res.locals.decodeToken._key)
  return res.status(200).json(user)
}

export const getUserById: RequestHandler = async (req, res) => {
  // TODO: validate Id
  const key = req.params.id
  const user = await usersCollection.document(key)
  return res.status(200).json(user)
}
