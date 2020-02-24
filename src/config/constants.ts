import { config } from 'dotenv'

// load environment variables
const NODE_ENV = process.env.NODE_ENV || 'local'

config({ path: `${__dirname}/../../.env.${process.env.NODE_ENV}` })

const env = process.env
export const PORT: number = Number(env.PORT) || 5000

// Twitter Oauth
export const TWITTER_API_KEY = env.TWITTER_API_KEY || ''
export const TWITTER_API_SECRET_KEY = env.TWITTER_API_SECRET_KEY || ''
export const TWITTER_CALLBACK = process.env.TWITTER_CALLBACK || '' // this callback redirect to frontend

// DATABASE
export const DATABASE_NAME = process.env.DATABASE_NAME || 'poliorama-local'
