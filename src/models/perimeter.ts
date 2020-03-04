import { string, object } from "joi";

export interface Perimeter {
  _id?: string
  _key?: string
  name: string
  lastName: string
  birth?: Date
  description: string
  position?: string
  academic?: any
  business?: [any]
  charges?: [any]
  campaigns?: [any]
}

