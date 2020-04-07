import { object, string, number, boolean, array } from 'joi'

export interface User {
  _id?: string
  _key: string
  twitterId: string
  screenName: string
  description: string
  picUrl: string
  role: 'god' | 'watchmen' | 'hunter' | 'novice'
}

export const userSchema = object({
  twitterId: string().required(),
  screenName: string().alphanum(),
  description: string().alphanum(),
  picUrl: string().uri(),
  roles: string().valid(['god', 'watchmen', 'Hunter', 'novice'])
})
