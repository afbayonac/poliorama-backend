import { RequestHandler } from 'express'
import { getAccessToken, getRequestToken, getVerifyCredentials } from '../../services/twiter'
import oauthStoreTemporal from '../../services/oauthStoreTemporal'
import db from '../../database'
import { aql } from 'arangojs'
import { encode } from '../middleware/jwt'
import { User } from '../../models/user'

// NOTE: save the oathTokenSecret is necessary for OAuth1 for that used oauthStoreTemporal
// TODO: handler errors
// TODO: validate body

export const oauthTwitter: RequestHandler = async (req, res, next) => {
  try {
    const data = await getRequestToken()
    await oauthStoreTemporal.set(data.oauth_token as string, data.oauth_token_secret, 10000)
    return res.status(200).json({ oauthToken: data.oauth_token })
  } catch (e) {
    next(e)
  }
}

export const oauthTwitterVerify: RequestHandler = async (req, res, next) => {
  try {
    const oauthToken = req.body.oauthToken
    const oauthTokenSecret = await oauthStoreTemporal.get(oauthToken)
    const oauthVerifier = req.body.oauthVerifier
    const data = await getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier)

    const profile = await getVerifyCredentials(
      data.oauth_token as string,
      data.oauth_token_secret as string,
      data.screen_name as string)

    const user = await upsertUser(profile)

    return res.status(200).json({ token: encode(user) })
  } catch (e) {
    if (e.isAxiosError && e.response.status === 401) {
      return res.status(401).json({ message: 'Authorization Required' })
    }
    next(e)
  }
}

async function upsertUser (u: any): Promise<User> {
  // TODO: Validate user
  // TODO: Add hash index unique twitterId and screenName
  const cursor = await db.query(aql`
      UPSERT { twitterId: ${u.id_str} }
      INSERT {
        twitterId: ${u.id_str},
        screenName: ${u.screen_name},
        description: ${u.description},
        verified: ${u.verified},
        defaultProfileImage: ${u.default_profile_image},
        picUrl: ${u.profile_image_url_https},
        permissions: {
          archive: true,
          validate: true
        }
      } 
      UPDATE { 
        screenName: ${u.screen_name},
        description: ${u.description},
        verified: ${u.verified},
        defaultProfileImage: ${u.default_profile_image},
        picUrl: ${u.profile_image_url_https}
      } IN users
      RETURN NEW
  `)

  return cursor.next()
}
