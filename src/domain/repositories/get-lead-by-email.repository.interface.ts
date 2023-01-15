import { Lead } from '../entities/lead.entity'

export interface GetLeadByEmailRepositoryInterface {
  getByEmail (email: string): Promise<Lead>
}
