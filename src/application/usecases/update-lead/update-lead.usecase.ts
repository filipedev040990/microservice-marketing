import { UpdateLeadRepositoryInterface } from '@/domain/repositories/update-lead.repository.interface'
import { UpdateLeadUseCaseInterface } from '@/domain/usecases/update-lead.usecase.interface'

export class UpdateLeadUseCase implements UpdateLeadUseCaseInterface {
  constructor (private readonly leadRepository: UpdateLeadRepositoryInterface) {}
  async execute (email: string, status: string): Promise<void> {
    await this.leadRepository.update(email, status)
  }
}
