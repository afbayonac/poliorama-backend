import { expect, use } from 'chai'
import dirtyChai from 'dirty-chai'

import db from '../../database'
import { DATABASE_NAME } from '../../config/constants'

use(dirtyChai)

before('init database 🥑🥑U0001F951📜', function (done) {
  db.listDatabases()
    .then(list => {
      if (list.indexOf(DATABASE_NAME) === -1) {
        return db.createDatabase(DATABASE_NAME)
      }
    })
    .then(() => db.useDatabase(DATABASE_NAME))
    .then(() => done())
    .catch(done)
})

describe('user', function () {
  it('create user document', function () {
    expect(true).equal(true)
  })
})
