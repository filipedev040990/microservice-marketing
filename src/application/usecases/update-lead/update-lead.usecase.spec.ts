import { UpdateLeadRepositoryInterface } from '@/domain/repositories/update-lead.repository.interface'
import { UpdateLeadUseCase } from './update-lead.usecase'

const leadRepository: jest.Mocked<UpdateLeadRepositoryInterface> = {
  update: jest.fn()
}

const makeSut = (): UpdateLeadUseCase => {
  return new UpdateLeadUseCase(leadRepository)
}

describe('Update Lead UseCase', () => {
  test('should call LeadRepository.update once and with correct values', async () => {
    const sut = makeSut()
    await sut.execute('anyEmail@email.com', 'Customer')

    expect(leadRepository.update).toHaveBeenCalledTimes(1)
    expect(leadRepository.update).toHaveBeenCalledWith('anyEmail@email.com', 'Customer')
  })
})
