import { Perimeter, Charge } from './perimeter'
import fk from 'faker'
import { date } from 'joi'

const academicFk = (): any => ({
  entity: fk.company.companyName(),
  date: fk.date.past(20),
  support: 'none'
})

const campaignsFk = (): any => ({
  date: fk.date.past(30),
  carge: fk.name.jobTitle(),
  elected: fk.random.boolean(),
  value: fk.commerce.price(1e6, 1e11)
})

const chargesFk = (): Charge => {
  const data = {
    title: fk.name.jobTitle(),
    dateStarted: fk.date.past(30),
    functionary: fk.random.boolean()
  }
  return fk.random.boolean() ? { ...data, dateEnd: fk.date.future(1, data.dateStarted) } : data
}

// the companys camby chabge of owners in the time how h

export const perimeterFk = (): Perimeter => {
  return {
    picUrl: fk.image.avatar(),
    twiter: 'elgatopolitico',
    name: fk.name.firstName(),
    lastName: fk.name.lastName(),
    birth: fk.date.between('01/01/1920', '01/01/2003'),
    description: fk.lorem.paragraph(10),
    verify: true,
    academic: {
      bachiller: academicFk(),
      tecnoligico: academicFk(),
      Profecional: academicFk(),
      especializacion: academicFk(),
      maestria: fk.random.boolean() ? academicFk() : null,
      doctorado: fk.random.boolean() ? academicFk() : null
    },
    campaigns: Array(Math.floor(Math.random() * 4))
      .fill(null).map(campaignsFk),
    charges: Array(Math.floor(Math.random() * 10))
      .fill(null).map(chargesFk)
  }
}
