import { Perimeter, Charge, Campaing, Academic } from './perimeter'
import fk from 'faker'

const academicFk = (): Academic => ({
  entity: fk.company.companyName(),
  title: fk.name.jobTitle(),
  type: fk.random.arrayElement(['tegnico', 'tecnologico', 'pregrado', 'maestria', 'doctorado']),
  date: fk.date.past(20),
  support: 'none',
  verify: fk.random.boolean()
})

const campaignsFk = (): Campaing => ({
  date: fk.date.past(30),
  charge: fk.name.jobTitle(),
  elected: fk.random.boolean(),
  mount: Number(fk.commerce.price(1e6, 1e11)),
  verify: fk.random.boolean()
})

const chargesFk = (): Charge => {
  const data = {
    title: fk.name.jobTitle(),
    dateStarted: fk.date.past(30),
    functionary: fk.random.boolean(),
    verify: fk.random.boolean()
  }

  return fk.random.boolean() ? { ...data, dateEnd: fk.date.future(1, data.dateStarted) } : data
}

// the companys camby chabge of owners in the time how h

export const perimeterFk = (): Perimeter => {
  return {
    picUrl: fk.image.avatar(),
    twitter: 'elgatopolitico',
    name: `${fk.name.firstName()} ${fk.name.firstName()}`,
    lastName: `${fk.name.lastName()} ${fk.name.lastName()}`,
    birth: fk.date.between('01/01/1920', '01/01/2003').getTime(),
    createDate: Date.now(),
    description: fk.lorem.paragraph(10),
    verify: true,
    academic: Array(Math.floor(Math.random() * 4))
      .fill(null).map(academicFk),
    campaigns: Array(Math.floor(Math.random() * 4))
      .fill(null).map(campaignsFk),
    charges: Array(Math.floor(Math.random() * 10))
      .fill(null).map(chargesFk)
  }
}
