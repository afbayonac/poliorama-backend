import { User } from './user'
import { random, internet, lorem } from 'faker'

export const userFk = (role?: 'god' | 'hunter' | 'lookout'): User => {
  return {
    _key: random.number({ min: 100000000, max: 999999999 }).toString(),
    twitterId: random.number({ min: 100000000, max: 999999999 }).toString(),
    screenName: internet.userName(),
    description: lorem.sentence(),
    role: role || random.arrayElement(['god', 'hunter', 'lookout'])
  }
}
