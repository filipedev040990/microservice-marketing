import { Lead } from '../entities/lead.entity'

export interface GetLeadByEmailUseCaseInterface {
  execute (email: string): Promise<Lead>
}
