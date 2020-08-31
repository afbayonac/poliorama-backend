import { use, expect } from 'chai'
import { subjectFk } from '../../models/subjectFake'
import { Role } from '../../models/user'
import db from '../../database'
import dirtyChai from 'dirty-chai'
import request from 'supertest'
import fk from 'faker'

import server from '../../server'
import { userFk } from '../../models/userFake'
import { encode } from '../middleware/jwt'
use(dirtyChai)

const agent = request.agent(server)

describe('permieter', function () {
  let subject = subjectFk()
  const userNovice = userFk(Role.NOVICE)
  const userGod = userFk(Role.GOD)
  const userHunter = userFk(Role.HUNTER)

  // add subject test
  before('database 🥑 save subject', async function () {
    const collections = (await db.listCollections()).map((e: { name: string }) => e.name)
    const subjectsCollection = db.collection('subjects')
    if (collections.indexOf('subjects') === -1) await subjectsCollection.create()
    const res = await subjectsCollection.save(subject)
    subject = { ...res, ...subject }
  })

  describe('get subject by id', function () {
    it('200', function (done) {
      agent
        .get(`/subject/${subject._key}`)
        .expect(200)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('_id', subject._id)
          expect(body).to.have.property('_key', subject._key)
          expect(body).to.have.property('name', subject.name)
          expect(body).to.have.property('lastName', subject.lastName)
          done()
        })
    })

    it('404', function (done) {
      agent
        .get('/subject/somestring')
        .expect(404)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'resource no found')
          done()
        })
    })
  })

  describe('create subject', function () {
    it('200', function (done) {
      agent
        .post('/subject')
        .set('Authorization', `Bearer ${encode(userHunter)}`)
        .send({
          name: fk.name.firstName(),
          lastName: fk.name.lastName(),
          bird: fk.date.between('01/01/1920', '01/01/1950').getMilliseconds(),
          description: fk.lorem.paragraph(10),
          twiter: 'elgatopolitico'
        })
        .expect(200)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'subject created')
          expect(body).to.have.property('subject')
          done()
        })
    })

    it('401', function (done) {
      agent
        .post('/subject')
        .set('Authorization', `Bearer ${encode(userNovice)}`)
        .send({
          name: fk.name.firstName(),
          lastName: fk.name.lastName(),
          bird: fk.date.between('01/01/1920', '01/01/1950').getMilliseconds(),
          description: fk.lorem.paragraph(10),
          twiter: 'elgatopolitico'
        })
        .expect(401)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'you do not have required permissions')
          done()
        })
    })
  })

  describe('delete subject', function () {
    it('200', function (done) {
      agent
        .delete(`/subject/${subject._key}`)
        .set('Authorization', `Bearer ${encode(userGod)}`)
        .expect(200)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'subject deleted')
          done()
        })
    })

    it('404', function (done) {
      agent
        .delete(`/subject/${fk.random.words(1)}`)
        .set('Authorization', `Bearer ${encode(userGod)}`)
        .expect(404)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'resource no found')
          done()
        })
    })

    it('401', function (done) {
      agent
        .delete(`/subject/${subject._key}`)
        .set('Authorization', `Bearer ${encode(userHunter)}`)
        .expect(401)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'you do not have required permissions')
          done()
        })
    })

    it('401', function (done) {
      agent
        .delete(`/subject/${subject._key}`)
        .set('Authorization', `Bearer ${encode(userNovice)}`)
        .expect(401)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'you do not have required permissions')
          done()
        })
    })
  })
})
