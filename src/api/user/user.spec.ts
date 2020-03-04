import { expect, use } from 'chai'
import dirtyChai from 'dirty-chai'
import request, { Response } from 'supertest'
import server from '../../server'
import { userFk } from '../../models/userFake'
import { encode } from '../middleware/jwt'
import db from '../../database'
use(dirtyChai)
const user = userFk()

const agent = request.agent(server)

describe('user', function () {

  before('save user', async function () {
    const collections = (await db.listCollections()).map((e: { name: string }) => e.name)
    const usersCollection = db.collection('users')
    if (collections.indexOf('users') === -1) await usersCollection.create()
    await usersCollection.save(user)
  })

  it('successfull', function (done) {
    agent
      .get('/user')
      .set('Authorization', `Bearer ${encode(user)}`)
      .expect(200)
      .end((err, { body }: Response) => {
        const user = body
        expect(err).to.be.null()
        expect(user)
          .to.have.property('_key')
          .to.have.property('userName')
          .to.have.property('pic')
          .to.have.property('description')
          .to.have.property('role')

        done()
      })
  })
})
