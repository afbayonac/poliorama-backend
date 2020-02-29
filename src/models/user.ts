import { object, string, number, boolean, array } from 'joi'

export interface IUser {
  _key: string
  twitterId: string
  screenName: string
  description: string
  role: 'god' | 'lookout' | 'hunter'
}

export const userSchema = object({
  twitterId: string().required(),
  screenName: string().alphanum(),
  description: string().alphanum(),
  picUrl: string().uri(),
  roles: string().valid(['god', 'lookout', 'Hunter'])
})
