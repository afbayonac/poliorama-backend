import { Perimeter } from './perimeter'
import fk from 'faker'

const academic = () => ({
  entity: fk.company.companyName(),
  date: fk.date.past(20),
  support: 'none'
})

export const perimeterFk = (): Perimeter => {
  return {
    name: fk.name.firstName(),
    lastName: fk.name.lastName(),
    birth: fk.date.past(40),
    description: fk.lorem.paragraph(10),
    academic: {
      bachiller: academic(),
      tecnoligico: academic(),
      Profecional: academic(),
      especializacion: academic(),
      maestria: academic(),
      doctorado: academic()
    }
  }
}
