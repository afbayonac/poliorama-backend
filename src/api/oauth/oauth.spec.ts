import { expect, use } from 'chai'
import dirtyChai from 'dirty-chai'
import server from '../../server'
import supertest ,{ Response} from 'supertest'

use(dirtyChai)

const agent = supertest.agent(server)

describe('oauth', function () {
 it('get oauth token', function (done) {
   agent
     .get('/api/oauth/twitter')
     .expect('Content-Type', /json/)
     .expect(200)
     .end((err, { body } : Response) => {
       expect(err).to.be.null()
       expect(body.oauth_token).to.be.a('string')
       done()
     })
 })
})


