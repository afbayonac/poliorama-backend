import { User, Status, Role } from './user'
import { random, internet, lorem } from 'faker'

const { GOD, HUNTER, NOVICE, WATCHMEN } = Role
const { REVIEW, REGULAR, BANNED, BLOCKED } = Status

export const userFk = (role?: Role): User => {
  return {
    _key: random.number({ min: 100000000, max: 999999999 }).toString(),
    twitterId: random.number({ min: 100000000, max: 999999999 }).toString(),
    screenName: internet.userName(),
    description: lorem.sentence(),
    role: role || random.arrayElement([GOD, HUNTER, WATCHMEN, NOVICE]),
    picUrl: internet.avatar(),
    status: random.arrayElement([REVIEW, REGULAR, BANNED, BLOCKED])
  }
}
