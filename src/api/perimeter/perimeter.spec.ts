import { use, expect } from 'chai'
import { perimeterFk } from '../../models/perimeterFake'
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
  let perimeter = perimeterFk()
  const userNovice = userFk(Role.NOVICE)
  const userGod = userFk(Role.GOD)
  const userHunter = userFk(Role.HUNTER)

  // add perimeter test
  before('database 🥑 save perimeter', async function () {
    const collections = (await db.listCollections()).map((e: { name: string }) => e.name)
    const perimetersCollection = db.collection('perimeters')
    if (collections.indexOf('perimeters') === -1) await perimetersCollection.create()
    const res = await perimetersCollection.save(perimeter)
    perimeter = { ...res, ...perimeter }
  })

  describe('get perimeter by id', function () {
    it('200', function (done) {
      agent
        .get(`/perimeter/${perimeter._key}`)
        .expect(200)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('_id', perimeter._id)
          expect(body).to.have.property('_key', perimeter._key)
          expect(body).to.have.property('name', perimeter.name)
          expect(body).to.have.property('lastName', perimeter.lastName)
          done()
        })
    })

    it('404', function (done) {
      agent
        .get('/perimeter/somestring')
        .expect(404)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'resource no found')
          done()
        })
    })
  })

  describe('create perimeter', function () {
    it('200', function (done) {
      agent
        .post('/perimeter')
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
          expect(body).to.have.property('message', 'perimeter created')
          expect(body).to.have.property('perimeter')
          done()
        })
    })

    it('401', function (done) {
      agent
        .post('/perimeter')
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

  describe('delete perimeter', function () {
    it('200', function (done) {
      agent
        .delete(`/perimeter/${perimeter._key}`)
        .set('Authorization', `Bearer ${encode(userGod)}`)
        .expect(200)
        .end((err, { body }) => {
          expect(err).to.be.null()
          expect(body).to.have.property('message', 'perimeter deleted')
          done()
        })
    })

    it('404', function (done) {
      agent
        .delete(`/perimeter/${fk.random.words(1)}`)
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
        .delete(`/perimeter/${perimeter._key}`)
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
        .delete(`/perimeter/${perimeter._key}`)
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
