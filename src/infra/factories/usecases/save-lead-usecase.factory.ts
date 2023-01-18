import { SaveLeadUseCase } from '@/application/usecases/save-lead/save-lead.usecase'
import { LeadRepository } from '@/infra/database/repositories/lead.repository'

export const makeSaveLeadUseCaseFactory = (): SaveLeadUseCase => {
  const leadRepository = new LeadRepository()
  return new SaveLeadUseCase(leadRepository)
}
