import constants from '../../shared/constants'

export class Lead {
  private readonly status: string
  constructor (private readonly name: string, private readonly email: string) {
    this.status = constants.LEAD_STATUS_INTERESTED
  }
}
