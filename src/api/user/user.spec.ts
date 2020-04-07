import { expect, use } from 'chai'
import dirtyChai from 'dirty-chai'
import request, { Response } from 'supertest'
import server from '../../server'
import { userFk } from '../../models/userFake'
import { encode } from '../middleware/jwt'
import db from '../../database'
use(dirtyChai)

const agent = request.agent(server)

describe('user', function () {
  const userNovice = userFk('novice')
  const userWatchmen = userFk('watchmen')
  const userGood = userFk('god')

  before('database 🥑 save user', async function () {
    const collections = (await db.listCollections()).map((e: { name: string }) => e.name)
    const usersCollection = db.collection('users')
    if (collections.indexOf('users') === -1) await usersCollection.create()
    await usersCollection.save(userNovice)
  })

  it('200 get own user by id', function (done) {
    agent
      .get('/user')
      .set('Authorization', `Bearer ${encode(userNovice)}`)
      .expect(200)
      .end((err, { body }: Response) => {
        const user = body
        expect(err).to.be.null()
        expect(user).to.have.property('_key', userNovice._key)
        expect(user).to.have.property('screenName', userNovice.screenName)
        expect(user).to.have.property('picUrl', userNovice.picUrl)
        expect(user).to.have.property('description', userNovice.description)
        expect(user).to.have.property('role', userNovice.role)
        done()
      })
  })

  it('200 get user by id with permission', function (done) {
    agent
      .get(`/user/${userNovice._key}`)
      .set('Authorization', `Bearer ${encode(userGood)}`)
      .expect(200)
      .end((err, { body }: Response) => {
        const user = body
        expect(err).to.be.null()
        expect(user).to.have.property('_key', userNovice._key)
        expect(user).to.have.property('screenName', userNovice.screenName)
        expect(user).to.have.property('picUrl', userNovice.picUrl)
        expect(user).to.have.property('description', userNovice.description)
        expect(user).to.have.property('role', userNovice.role)
        done()
      })
  })

  it('404 get user by id with permission', function (done) {
    agent
      .get('/user/somestring')
      .set('Authorization', `Bearer ${encode(userGood)}`)
      .expect(404)
      .end((err, { body }: Response) => {
        const user = body
        expect(err).to.be.null()
        expect(user).to.have.property('message', 'resource no found')
        done()
      })
  })

  it('401 get user by id without permisson', function (done) {
    agent
      .get(`/user/${userWatchmen._key}`)
      .set('Authorization', `Bearer ${encode(userNovice)}`)
      .expect(401)
      .end((err, { body }: Response) => {
        expect(err).to.be.null()
        expect(body).to.have.property('message', 'you do not have required permissions')
        done()
      })
  })

  it('401 get user by id with fake token', function (done) {
    const tokenFake = 'Bearer ' +
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJzdWIiOiIxMjM0NXM2Nzg5MCIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.' +
    'Ecw72UWT11Tv-Et2FchU6LFhm2wjEPrpMY2NdWEoiqA'

    agent
      .get(`/user/${userWatchmen._key}`)
      .set('Authorization', tokenFake)
      .expect(401)
      .end((err, { body }: Response) => {
        expect(err).to.be.null()
        expect(body).to.have.property('message', 'invalid token')
        done()
      })
  })

  it('401 get user by id without token', function (done) {
    agent
      .get(`/user/${userWatchmen._key}`)
      .expect(401)
      .end((err, { body }: Response) => {
        expect(err).to.be.null()
        expect(body).to.have.property('message', 'unauthorized')
        done()
      })
  })
})
