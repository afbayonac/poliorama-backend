export interface Organization {
  _id: string
  _key?: string
  name: string
  fundedAt: Date
  closedAt?: Date
  type: OrganizationType
}

export enum OrganizationType {
  Partido = 'PARTIDO',
  Organizacion = 'ORGANIZACION',
}
