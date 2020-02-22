import { expect } from 'chai'
import request, { Response } from 'supertest'
import 'mocha'

import app from './app'

describe('Init app', function () {
  it('Hello app', function (done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, { body }: Response) => {
        expect(err).to.be.null
        expect(body.message).equal('Poliorama API REST running')
        done()
      })
  })
})
