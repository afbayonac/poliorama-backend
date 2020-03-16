import { encode, decode } from './jwt'
import { expect, use } from 'chai'
import chaiJWT from 'chai-jwt'
import dirtyChai from 'dirty-chai'
import { userFk } from '../../models/userFake'
import { JWT_SECRET_KEY } from '../../config/constants'

use(dirtyChai)
use(chaiJWT)

const user = userFk()

describe('jwt', function () {
  it('encode', function () {
    const token = encode(user)
    expect(token).to.be.a.jwt
      .and.have.claim('_key', user._key)
      .and.have.claim('picUrl', user.picUrl)
      .and.have.claim('screenName', user.screenName)
      .and.have.claim('role', user.role)
    expect(token).signedWith(JWT_SECRET_KEY)
  })

  it('encode', function () {
    const token = encode(user)
    const data = decode(token)
    expect(data).to.have.property('_key', user._key)
    expect(data).to.have.property('picUrl', user.picUrl)
    expect(data).to.have.property('screenName', user.screenName)
    expect(data).to.have.property('role', user.role)
  })
})
