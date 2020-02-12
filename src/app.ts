import express, { Application } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import oauth from './api/oauth/oauth'

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

  private setConfig () {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cors(corsOption)) // this should be limit in production
    this.app.use('/api', oauth)
  }
}

export default new App().app