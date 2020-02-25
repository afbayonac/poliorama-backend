import request, { RequestResponse } from 'request'
import querystring from 'querystring'
import { Request, Response, NextFunction } from 'express'
import Twitter from 'twitter'
import axios, { Method, AxiosResponse } from 'axios'
import OAuth from 'oauth-1.0a'
import crypto from 'crypto'

import { TWITTER_API_KEY, TWITTER_API_SECRET_KEY, TWITTER_CALLBACK } from '../../config/constants'
import oauthStoreTemporal from './oauthStoreTemporal'
import has = Reflect.has

const oauth = new OAuth({
  consumer: {
    key: TWITTER_API_KEY,
    secret: TWITTER_API_SECRET_KEY
  },
  signature_method: 'HMAC-SHA1', // eslint-disable-line @typescript-eslint/camelcase
  hash_function: (base: string, key: any) => { // eslint-disable-line @typescript-eslint/camelcase
    return crypto
      .createHmac('sha1', key)
      .update(base)
      .digest('base64')
  }
})

export const requestToken = (req: Request, res: Response, next: NextFunction): void => {
  const request: {
    method: Method
    data: any
    url: string
  } = {
    method: 'POST',
    data: { oauth_callback: TWITTER_CALLBACK }, // eslint-disable-line @typescript-eslint/camelcase
    url: 'https://api.twitter.com/oauth/request_token'
  }

  axios({
    method: request.method,
    url: request.url,
    headers: oauth.toHeader(oauth.authorize(request))
  })
    .then((response: AxiosResponse) => {
      const oa = querystring.decode(response.data)
      oauthStoreTemporal.set(Array.isArray(oa.oauth_token) ? '' : oa.oauth_token, oa.oauth_token_secret, 10000)
      res.locals = oa
      return next()
    })
    .catch(err => next(err))
}

export const requestAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const request: {
    method: Method
    data: any
    url: string
  } = {
    url: 'https://api.twitter.com/oauth/access_token',
    method: 'POST',
    data: {
      oauth_verifier: req.body.oauthVerifier // eslint-disable-line @typescript-eslint/camelcase
    }
  }

  console.log(req.body)
  const token = {
    key: req.body.oauthToken,
    secret: await oauthStoreTemporal.get(req.body.oauthToken)
  }

  console.log(token)
  console.log(oauth.authorize(request, token))
  axios({
    method: request.method,
    url: request.url,
    headers: oauth.toHeader(oauth.authorize(request, token))
  })
    .then(res => console.log(res.status))
    .catch(err => {
      console.log(Object.keys(err))
      console.log(err.config)
      console.log(err.response.data)
    })
}

// TODO: add terms of service url for get the email and verify if the user verified that
export const getTwitterUser = async (req: Request, res: Response, next: NextFunction) => {
  const client = new Twitter({
    consumer_key: TWITTER_API_KEY, // eslint-disable-line @typescript-eslint/camelcase
    consumer_secret: TWITTER_API_SECRET_KEY, // eslint-disable-line @typescript-eslint/camelcase
    access_token_key: res.locals.oauth_token, // eslint-disable-line @typescript-eslint/camelcase
    access_token_secret: res.locals.oauth_token_secret // eslint-disable-line @typescript-eslint/camelcase
  })

  const data = client.get('account/verify_credentials', {
    name: res.locals.screen_name,
    include_email: true // eslint-disable-line @typescript-eslint/camelcase
  })
  res.locals = { ...res.locals, ...data }
  next()
}
