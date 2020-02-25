import { expect, use } from 'chai'
import dirtyChai from 'dirty-chai'
import server from '../../server'
import supertest, { Response } from 'supertest'

use(dirtyChai)

const agent = supertest.agent(server)

describe('oauth', function () {
  it('get oauth token', function (done) {
    this.timeout(10000) // twitter sometimes is very slow
    agent
      .get('/oauth/twitter')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, { body }: Response) => {
        if (err) return done(err)
        expect(body.oauthToken).to.be.a('string')
        done()
      })
  })

  it('check user login', function(done) {
    this.timeout(10000)
    agent
      .post('/oauth/twitter')
      .send({
        oauthToken: 'token-example',
        oauthVerifier: 'verifier-example'
      })
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, { body }: Response) => {
        if (err) return done(err)
        expect(body.message).to.be.a('string')
        done()
      })
  })
})
