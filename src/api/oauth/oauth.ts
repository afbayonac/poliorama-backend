import express, { Request, Response } from 'express'
import { getRequestToken, getAccessToken, getVerifyCredentials } from '../../services/twiter'
import oauthStoreTemporal from '../../services/oauthStoreTemporal'

const oauthRouter = express.Router()

// save the oathTokenSecret is necessary for OAuth1 for that used oauthStoreTemporal
// TODO: handler errors
// TODO: validate body

oauthRouter.route('/twitter')
  .get(async (req: Request, res: Response) => {
    try {
      const data = await getRequestToken()
      await oauthStoreTemporal.set(data.oauth_token as string, data.oauth_token_secret, 10000)
      res.status(200).json({ oauthToken: data.oauth_token })
    } catch (e) {
      res.status(500).json({ message: 'internal Error server' })
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const oauthToken = req.body.oauthToken
      const oauthTokenSecret = await oauthStoreTemporal.get(oauthToken)
      const oauthVerifier = req.body.oauthVerifier
      const data = await getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier)
      const profile = await getVerifyCredentials(
        data.oauth_token as string,
        data.oauth_token_secret as string,
        data.screen_name as string)
      res.status(200).json({ ...data, ...profile })
    } catch (e) {
      if (e.isAxiosError && e.response.status === 401) {
        res.status(401).json({ message: 'Authorization Required' })
      } else {
        res.status(500).json({ message: 'internal Error server' })
      }
    }
  })

export default oauthRouter
