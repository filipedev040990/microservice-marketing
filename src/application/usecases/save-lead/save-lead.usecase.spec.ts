import { SaveLeadRepositoryInterface } from '@/domain/repositories/save-lead.repository.interface'
import { SaveLeadUseCase } from './save-lead.usecase'

const leadRepository: jest.Mocked<SaveLeadRepositoryInterface> = {
  save: jest.fn()
}

const makeSut = (): SaveLeadUseCase => {
  return new SaveLeadUseCase(leadRepository)
}

describe('SaveLeadUseCase', () => {
  test('should call LeadRepository.save once and with correct values', async () => {
    const sut = makeSut()

    await sut.execute('Any Name', 'anyEmail@email.com')

    expect(leadRepository.save).toHaveBeenCalledTimes(1)
    expect(leadRepository.save).toHaveBeenCalledWith({
      name: 'Any Name',
      email: 'anyEmail@email.com',
      status: 'Interested'
    })
  })

  test('should return server error if LeadRepository.save throws', async () => {
    const sut = makeSut()

    leadRepository.save.mockRejectedValueOnce(new Error())

    const response = sut.execute('Any Name', 'anyEmail@email.com')

    await expect(response).rejects.toThrow()
  })
})
