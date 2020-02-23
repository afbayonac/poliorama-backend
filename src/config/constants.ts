import { config } from 'dotenv'

// load environment variables
config({ path: `${__dirname}/../../.env` })

switch (process.env.NODE_ENV) {
  case 'development':
    config({ path: `${__dirname}/../../.env.development` })
    break
  case 'production':
    config({ path: `${__dirname}/../../.env.production` })
    break
  case 'staging':
    config({ path: `${__dirname}/../../.env.staging` })
    break
}

const env = process.env
export const PORT: number = Number(env.PORT) || 5000

// Twitter Oauth
export const TWITTER_API_KEY = env.TWITTER_API_KEY || ''
export const TWITTER_API_SECRET_KEY = env.TWITTER_API_SECRET_KEY || ''
export const TWITTER_CALLBACK = process.env.TWITTER_CALLBACK || '' // this callback redirect to frontend

// DATABASE
export const DATABASE_NAME = process.env.DATABASE_NAME || ''
