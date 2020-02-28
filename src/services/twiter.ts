import querystring from 'querystring'
import Twitter from 'twitter'
import axios, { Method } from 'axios'
import OAuth from 'oauth-1.0a'
import crypto from 'crypto'

import { TWITTER_API_KEY, TWITTER_API_SECRET_KEY, TWITTER_CALLBACK } from '../config/constants'

const oauth = new OAuth({
  consumer: { key: TWITTER_API_KEY, secret: TWITTER_API_SECRET_KEY },
  signature_method: 'HMAC-SHA1', // eslint-disable-line @typescript-eslint/camelcase
  hash_function: (base: string, key: any) => { // eslint-disable-line @typescript-eslint/camelcase
    return crypto
      .createHmac('sha1', key)
      .update(base)
      .digest('base64')
  }
})

// get request token { oauth_token and oauth token secret } the last should be save in server
export const getRequestToken = async () => {
  const request: { method: Method, data: any, url: string } = {
    method: 'POST',
    data: { oauth_callback: TWITTER_CALLBACK }, // eslint-disable-line @typescript-eslint/camelcase
    url: 'https://api.twitter.com/oauth/request_token'
  }

  const response = await axios({
    method: request.method,
    url: request.url,
    headers: oauth.toHeader(oauth.authorize(request))
  })
  return querystring.decode(response.data)
}

// get the access_token twitter
export const getAccessToken = async (oauthToken: string, oauthTokenSecret: string, oauthVerifier: string) => {
  const request: { method: Method, data: any, url: string } = {
    url: 'https://api.twitter.com/oauth/access_token',
    method: 'POST',
    data: { oauth_verifier: oauthVerifier } // eslint-disable-line @typescript-eslint/camelcase
  }

  const token = { key: oauthToken, secret: oauthToken }

  const response = await axios({
    method: request.method,
    url: request.url,
    headers: oauth.toHeader(oauth.authorize(request, token))
  })

  return querystring.decode(response.data)
}

// TODO: add terms of service url for get the email and verify if the user verified that
export const getVerifyCredentials = async (tokenKey: string, tokenSecret: string, screenName: string) => {
  const client = new Twitter({
    consumer_key: TWITTER_API_KEY, // eslint-disable-line @typescript-eslint/camelcase
    consumer_secret: TWITTER_API_SECRET_KEY, // eslint-disable-line @typescript-eslint/camelcase
    access_token_key: tokenKey, // eslint-disable-line @typescript-eslint/camelcase
    access_token_secret: tokenSecret // eslint-disable-line @typescript-eslint/camelcase
  })

  const profile = await client.get('account/verify_credentials', {
    name: screenName,
    include_email: true // eslint-disable-line @typescript-eslint/camelcase
  })

  return profile
}
