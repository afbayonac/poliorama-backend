import { Router } from 'express'
import { oauthTwitter, oauthTwitterVerify } from './controller'

const oauthRouter = Router()

oauthRouter.route('/twitter')
  .get(oauthTwitter)
  .post(oauthTwitterVerify)

export default oauthRouter
