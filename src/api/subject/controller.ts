import db from '../../database'
import { aql } from 'arangojs'
import { RequestHandler } from 'express'

const subjectsCollection = db.collection('subjects')

export const getSubject: RequestHandler = async (req, res, next) => {
  // TODO: validate params
  const key = req.params.id
  try {
    const subject = await subjectsCollection.document(key)
    return res.status(200).json(subject)
  } catch (e) { next(e) }
}

export const getSubjects: RequestHandler = async (req, res, next) => {
  // TODO: validate params
  const limit = req.query.limit || 1000
  try {
    // validationResult(req).throw()
    const cursor = await db.query(aql`
      FOR subject IN subjects
      LIMIT ${limit}
      RETURN subject
    `)
    const data = await cursor.all()
    return res.status(200).json(data)
  } catch (e) { next(e) }
}

export const createSubject: RequestHandler = async (req, res, next) => {
  try {
    const cursor = await db.query(aql`
      INSERT {
        name: ${req.body.name},
        lastname: ${req.body.lastName}
      } IN subjects
      RETURN NEW
    `)
    const data = await cursor.all()
    res.status(200).json({
      message: 'subject created',
      subject: data
    })
  } catch (e) { next(e) }
}

export const deleteSubject: RequestHandler = async (req, res, next) => {
  try {
    const cursor = await db.query(aql`
      REMOVE {
        _key: ${req.params.id}
      } IN subjects
      RETURN OLD
    `)

    const data = await cursor.all()
    res.status(200).json({
      message: 'subject deleted',
      subject: data
    })
  } catch (e) { next(e) }
}
