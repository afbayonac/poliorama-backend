import express, { Application, Response, Request } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import db from './database'
import oauth from './api/oauth/oauth'
import { DATABASE_NAME } from './config/constants'

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
    this.app.use('/', (_, response: Response) => {
      response
        .status(200)
        .json({ message: 'Poliorama API REST is running' })
    })
    this.configClientDatabase()
  }

  private async configClientDatabase () {
    try {
      const list = await db.listDatabases()
      if (list.indexOf(DATABASE_NAME) === -1) await db.createDatabase(DATABASE_NAME)
      db.useDatabase(DATABASE_NAME)
      const listCollections = (await db.listCollections()).map((e: {name: string}) => e.name)
      console.log(listCollections)
      // create user collection
      const users = db.collection('users')
      if (listCollections.indexOf('users') === -1) await users.create()
      // create perimeter collection
      const perimeters = db.collection('perimeters')
      if (listCollections.indexOf('perimeters') === -1) await perimeters.create()
      this.app.emit('databaseIsReady')
    } catch (e) {
      console.log(Object.keys(e))
      console.log(e.errorNum)
      console.log(e.code)
      console.log(e.statusCode)
      console.log(e.response)
    }
  }
}

export default new App().app
