import request, { RequestResponse } from 'request'
import querystring from 'querystring'
import { Request, Response, NextFunction } from 'express'
import Twitter from 'twitter'

import { TWITTER_API_KEY, TWITTER_API_SECRET_KEY, TWITTER_CALLBACK } from '../../config/constants'
import oauthStoreTemporal from './oauthStoreTemporal'

export const requestToken = (req: Request, res: Response, next: NextFunction) => {
  const options = {
    oauth: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      consumer_key: TWITTER_API_KEY,
      // eslint-disable-next-line @typescript-eslint/camelcase
      consumer_secret: TWITTER_API_SECRET_KEY,
      callback: TWITTER_CALLBACK
    }
  }
  request.post('https://api.twitter.com/oauth/request_token', options,
    (request: Request, response: RequestResponse, body: Body) => {
      const query = querystring.decode(String(body))
      console.log(query)
      res.locals = query
      oauthStoreTemporal.set(Array.isArray(query.oauth_token) ? '' : query.oauth_token, query.oauth_token_secret, 10000)
      next()
    })
}

export const requestAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const options = {
    oauth: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      consumer_key: TWITTER_API_KEY,
      // eslint-disable-next-line @typescript-eslint/camelcase
      consumer_secret: TWITTER_API_SECRET_KEY,
      // eslint-disable-next-line @typescript-eslint/camelcase
      token_secret: await oauthStoreTemporal.get(req.body.oauth_token),
      token: req.body.oauth_token,
      verifier: req.body.oauth_verifier,
      callback: TWITTER_CALLBACK
    }
  }

  request.post('https://api.twitter.com/oauth/access_token', options,
    (request: Request, response: RequestResponse, body) => {
      res.locals = querystring.decode(body)
      console.log(res.locals)
      next()
    })
}

export const getTwitterUser = async (req: Request, res: Response, next: NextFunction) => {
  const client = new Twitter({
    // eslint-disable-next-line @typescript-eslint/camelcase
    consumer_key: TWITTER_API_KEY,
    // eslint-disable-next-line @typescript-eslint/camelcase
    consumer_secret: TWITTER_API_SECRET_KEY,
    // eslint-disable-next-line @typescript-eslint/camelcase
    access_token_key: res.locals.oauth_token,
    // eslint-disable-next-line @typescript-eslint/camelcase
    access_token_secret: res.locals.oauth_token_secret
  })

  const data = await client.get('account/verify_credentials', { name: res.locals.screen_name })
  res.locals = { ...res.locals, ...data }
  next()
}
