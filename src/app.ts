import express, { Application, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import db from './database'
import oauth from './api/oauth/oauth'
import user from './api/user/user'
import subject from './api/subject/subject'
import errorHandler from './api/middleware/errorhandler'

import { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } from './config/constants'

// TODO: limit origins
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
}

class App {
  public app: Application

  constructor () {
    this.app = express()
    this.setConfig()
  }

  private setConfig (): void {
    // connect to data base
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors(corsOption)) // TODO: this should be limit in production
    this.app.use('/oauth', oauth)
    this.app.use('/user', user)
    this.app.use('/subject', subject)
    this.app.use('/', (_, res: Response) => res.status(200).json({ message: 'Poliorama API REST is running' }))
    this.app.use(errorHandler)
    this.configClientDatabase()
  }

  private async configClientDatabase (): Promise<void> {
    try {
      // login database
      db.useBasicAuth(DATABASE_USER, DATABASE_PASSWORD)

      const list = await db.listDatabases()
      if (list.indexOf(DATABASE_NAME) === -1) await db.createDatabase(DATABASE_NAME)
      db.useDatabase(DATABASE_NAME)

      // get list collections
      const listCollections = (await db.listCollections()).map((e: {name: string}) => e.name)

      // create user collection
      const users = db.collection('users')
      if (listCollections.indexOf('users') === -1) await users.create()

      // create subject collection
      const subjects = db.collection('subjects')
      if (listCollections.indexOf('subjects') === -1) await subjects.create()
      subjects.createFulltextIndex(['name'], 3)
      subjects.createFulltextIndex(['description'], 3)
      subjects.createFulltextIndex(['lastName'], 3)

      // get list edges collections
      const relations = db.edgeCollection('relations')
      if (listCollections.indexOf('relations') === -1) await relations.create()

      this.app.emit('databaseIsReady')
    } catch (e) {
      console.log(Object.keys(e))
      console.log(e.errorNum)
      console.log(e.code)
      console.log(e.statusCode)
      // console.log(e.response)
    }
  }
}

export default new App().app
