import constants from '@/shared/constants'

export class Lead {
  readonly status: string
  constructor (readonly name: string, readonly email: string) {
    this.status = constants.LEAD_STATUS_INTERESTED
  }
}
