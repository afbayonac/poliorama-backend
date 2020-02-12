import express, { Request, Response } from 'express'
import { requestToken, requestAccessToken, getTwitterUser } from '../middleware/twiter'
const oauthRouter = express.Router()

// Only use session for oauth services, this per oauth1.0 required

oauthRouter.route('/oauth/twitter').post(
  requestToken, // Get oauth token from twitter
  (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/camelcase
    res.json({ oauth_token: res.locals.oauth_token })
  })

oauthRouter.route('/oauth/twitter/verify').post(
  requestAccessToken, // Verify and get accessToken for the user
  getTwitterUser, // Get User data
  // TODO: Find or create user
  // TODO: Generate JWT
  (req: Request, res: Response) => {
    res.json(res.locals)
  })

export default oauthRouter
