import crypto from 'crypto'
import constants from '@/shared/constants'

export class Lead {
  readonly status: string
  readonly id: string
  readonly created_at: Date
  readonly updated_at?: Date

  constructor (readonly name: string, readonly email: string) {
    this.id = crypto.randomUUID()
    this.status = constants.LEAD_STATUS_INTERESTED
    this.created_at = new Date()
  }
}
