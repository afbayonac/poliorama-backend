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
    this.app.use('/', (_, response: Response) => {
      response
        .status(200)
        .json({ message: 'Poliorama API REST is running' })
    })
    this.app.use('/api', oauth)
    this.configClientDatabase()
  }

  private configClientDatabase (): void {
    db.listDatabases()
      .then(list => {
        if (list.indexOf(DATABASE_NAME) > -1) return db.useDatabase(DATABASE_NAME)
        return db.createDatabase(DATABASE_NAME)
      })
      .then(() => {
        this.app.emit('databaseIsReady')
      })
      .catch(err => {
        // TODO: handler errors
        console.log(err)
      })
  }
}

export default new App().app
