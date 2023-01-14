import { Lead } from '@/domain/entities/lead.entity'
import { SaveLeadRepositoryInterface } from '@/domain/repositories/save-lead.repository.interface'
import { SaveLeadInterface } from '@/domain/usecases/save-lead.usecase.interface'

export class SaveLeadUseCase implements SaveLeadInterface {
  constructor (readonly leadRepository: SaveLeadRepositoryInterface) {}
  async execute (name: string, email: string): Promise<void> {
    const lead = new Lead(name, email)
    await this.leadRepository.save({
      name: lead.name,
      email: lead.email,
      status: lead.status,
      created_at: new Date()
    })
  }
}
