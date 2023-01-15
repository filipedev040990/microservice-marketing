import { Lead } from '@/domain/entities/lead.entity'
import { GetLeadByEmailRepositoryInterface } from '@/domain/repositories/get-lead-by-email.repository.interface'
import { GetLeadByEmailUseCaseInterface } from '@/domain/usecases/get-lead-by-email.usecase.interface'

export class GetLeadByEmailUseCase implements GetLeadByEmailUseCaseInterface {
  constructor (private readonly leadRepository: GetLeadByEmailRepositoryInterface) {}
  async execute (email: string): Promise<Lead> {
    const lead = await this.leadRepository.getByEmail(email)
    return lead || null
  }
}
