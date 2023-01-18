import { GetLeadByEmailUseCase } from '@/application/usecases/get-lead-by-email/get-lead-by-email.usecase'
import { GetLeadByEmailUseCaseInterface } from '@/domain/usecases/get-lead-by-email.usecase.interface'
import { LeadRepository } from '@/infra/database/repositories/lead.repository'

export const makeGetLeadByEmailUseCaseFactory = (): GetLeadByEmailUseCaseInterface => {
  const leadRepository = new LeadRepository()
  return new GetLeadByEmailUseCase(leadRepository)
}
