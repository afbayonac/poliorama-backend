import { use, expect } from 'chai'
import { perimeterFk } from '../../models/perimeterFake'
import db from '../../database'
import dirtyChai from 'dirty-chai'
import request from 'supertest'

import server from '../../server'
use(dirtyChai)

const agent = request.agent(server)

describe('permieter', function () {
  let perimeter = perimeterFk()

  before('database 🥑 save perimeter', async function () {
    const collections = (await db.listCollections()).map((e: { name: string }) => e.name)
    const perimetersCollection = db.collection('perimeters')
    if (collections.indexOf('perimeters') === -1) await perimetersCollection.create()
    const res = await perimetersCollection.save(perimeter)
    perimeter = { ...res, ...perimeter }
  })

  it('200 get perimeter by id', function (done) {
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

  it('404 get perimeter by id', function (done) {
    agent
      .get('/perimeter/somestring')
      .expect(404)
      .end((err, { body }) => {
        expect(err).to.be.null()
        expect(body)
          .to.have.property('message', 'resource no found')
        done()
      })
  })
})
