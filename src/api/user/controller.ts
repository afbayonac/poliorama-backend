import { db } from '../../database'

const collection = db.collection('user')

export const findOrCreateUser = (user) => {
  collection.get({})
}
