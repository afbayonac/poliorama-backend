import { expect, use } from 'chai'
import dirtyChai from 'dirty-chai'
import request, { Response } from 'supertest'

import server from './server'
import db from './database'
import { DATABASE_NAME } from './config/constants'

const agent = request.agent(server)
use(dirtyChai)

describe('database', function () {
  it('correct database', function (done) {
    db.get().then(({ name, isSystem }) => {
      expect(name).is.equal(DATABASE_NAME)
      done()
    }).catch(done)
  })
})

describe('Init app', function () {
  it('Hello app', function (done) {
    agent
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, { body }: Response) => {
        expect(err).to.be.null()
        expect(body.message).equal('Poliorama API REST is running')
        done()
      })
  })
})
