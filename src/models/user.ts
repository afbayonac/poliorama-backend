export interface User {
  _id?: string
  _key: string
  twitterId: string
  screenName: string
  description: string
  picUrl: string
  role: Role
  status: Status
}

export enum Status {
  REVIEW = 'review',
  BLOCKED = 'blocked',
  REGULAR = 'regular',
  BANNED = 'banned',
}

export enum Role {
  GOD = 'god',
  WATCHMEN = 'watchmen',
  HUNTER = 'hunter',
  NOVICE = 'novice',
}
