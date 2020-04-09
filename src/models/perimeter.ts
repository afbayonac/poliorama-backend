export interface Perimeter {
  _id?: string
  _key?: string
  picUrl?: string
  name: string
  lastName: string
  birth?: number
  twiter?: string
  description: string
  createDate: number
  academic?: Academic
  charges?: Charge[]
  campaigns?: any[]
  verify: boolean
  // business?: NOTE: any[] the companys can be change of onwers in the time how handle that ?
}

export interface Academic {
  bachiller?: any
  tecnoligico?: any
  Profecional?: any
  especializacion?: any
  maestria?: any
  doctorado?: any
}

export interface Charge {
  title: string
  dateStarted: Date
  dateEnd?: Date
  functionary: boolean // Tru if is a charge governmental
}
