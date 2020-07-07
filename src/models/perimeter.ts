export interface Perimeter {
  _id?: string
  _key?: string
  picUrl?: string
  name: string
  lastName: string
  birth?: number
  twitter?: string
  description: string
  createDate: number
  academic?: Academic[]
  charges?: Charge[]
  campaigns?: Campaing[]
  verify: boolean
  organizations: OrganizationRef[]
  // business?: NOTE: any[] the companys can be change of onwers in the time how handle that ?
}

export interface Academic {
  entity: string
  type: 'tegnico'| 'tecnologico' | 'pregrado' | 'maestria' | 'doctorado'
  title: string
  date: Date
  support?: string
  verify: boolean
}

export interface Charge {
  title: string
  functionary: boolean // True if is a charge governmental
  dateStarted: Date
  dateEnd?: Date
  support?: string
  verify: boolean
}

export interface Campaing {
  charge: string
  date: Date
  mount: number
  elected: boolean
  support?: string
  verify: boolean
}

export interface OrganizationRef {
  _key?: string
}
