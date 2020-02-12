import secrets from './secrets'

export const PORT = 5000
export const TWITTER_API_KEY = secrets.twitter.apiKey
export const TWITTER_API_SECRET_KEY = secrets.twitter.apiSecretKey
export const TWITTER_CALLBACK = 'http://localhost:3000/login/twitter'