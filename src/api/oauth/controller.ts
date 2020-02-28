import { Request, Response } from 'express'
import { getAccessToken, getRequestToken, getVerifyCredentials } from '../../services/twiter'
import oauthStoreTemporal from '../../services/oauthStoreTemporal'
import db from '../../database'
import { aql } from 'arangojs'

// NOTE: save the oathTokenSecret is necessary for OAuth1 for that used oauthStoreTemporal
// TODO: handler errors
// TODO: validate body

export const oauthTwitter = async (req: Request, res: Response) => {
  try {
    const data = await getRequestToken()
    await oauthStoreTemporal.set(data.oauth_token as string, data.oauth_token_secret, 10000)
    res.status(200).json({ oauthToken: data.oauth_token })
  } catch (e) {
    res.status(500).json({ message: 'internal Error server' })
  }
}

export const oauthTwitterVerify = async (req: Request, res: Response) => {
  try {
    const oauthToken = req.body.oauthToken
    const oauthTokenSecret = await oauthStoreTemporal.get(oauthToken)
    const oauthVerifier = req.body.oauthVerifier
    const data = await getAccessToken(oauthToken, oauthTokenSecret, oauthVerifier)

    console.info(data)

    const profile = await getVerifyCredentials(
      data.oauth_token as string,
      data.oauth_token_secret as string,
      data.screen_name as string)

    const user = await upsertUser(profile)
    console.log('user: ', user)
    res.status(200).json({ ...data, ...profile })
  } catch (e) {
    if (e.isAxiosError && e.response.status === 401) {
      return res.status(401).json({ message: 'Authorization Required' })
    }
    console.log(e)
  }
}

async function upsertUser (u: any) {
  // TODO: Validate user
  // TODO: Add hash index unique twitterId
  const cursor = await db.query(aql`
      UPSERT { twitterId: ${u.id_str} }
      INSERT {
        twitterId: ${u.id_str},
        screenName: ${u.screen_name},
        description: ${u.description},
        verified: ${u.verified},
        defaultProfileImage: ${u.default_profile_image},
        pic: ${u.profile_image_url_https}
        role: 'archivador'
      } 
      UPDATE { 
        screenName: ${u.screen_name},
        description: ${u.description},
        verified: ${u.verified},
        defaultProfileImage: ${u.default_profile_image},
        pic: ${u.profile_image_url_https}
      } IN users
      RETURN NEW
  `)

  return cursor.next()
}
