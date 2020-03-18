import { string, object } from "joi";

export interface Perimeter {
  _id?: string
  _key?: string
  picUrl: string
  name: string
  lastName: string
  birth?: Date
  description: string
  academic?: any
  // business?: NOTE: any[] the companys can be change of onwers in the time how handle that ?
  charges?: Charge[]
  campaigns?: any[]
}

export interface Charge {
  title: string
  dateStarted: Date
  dateEnd?: Date
  functionary: boolean // Tru if is a charge governmental
}
