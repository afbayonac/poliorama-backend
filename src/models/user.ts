export interface User {
  _id?: string
  _key: string
  twitterId: string
  screenName: string
  description: string
  picUrl: string
  role: 'god' | 'watchmen' | 'hunter' | 'novice'
  status: statusUser
}

export enum statusUser {
  review = 'REVIEW',
  block = 'BLOCK',
  regular = 'REGULAR',
  banned = 'BANNED',
}
