import { config } from 'dotenv'

// load environment variables
const NODE_ENV = process.env.NODE_ENV || 'local'

config({ path: `${__dirname}/../../.env.${NODE_ENV}` })

const env = process.env
export const PORT: number = Number(env.PORT) || 5000

// Twitter Oauth
export const TWITTER_API_KEY = env.TWITTER_API_KEY || ''
export const TWITTER_API_SECRET_KEY = env.TWITTER_API_SECRET_KEY || ''
export const TWITTER_CALLBACK = env.TWITTER_CALLBACK || '' // this callback redirect to frontend

// DATABASE
export const DATABASE_NAME = env.DATABASE_NAME || 'poliorama-local'
export const DATABASE_USER = env.DATABASE_USER || 'root'
export const DATABASE_PASSWORD = env.DATABASE_PASSWORD || ''

// jwt
export const JWT_SECRET_KEY = env.JWT_SECRET_KEY || ''
