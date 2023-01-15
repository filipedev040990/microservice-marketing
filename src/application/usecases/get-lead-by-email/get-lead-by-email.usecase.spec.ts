import { GetLeadByEmailRepositoryInterface } from '@/domain/repositories/get-lead-by-email.repository.interface'
import { GetLeadByEmailUseCase } from './get-lead-by-email.usecase'

const leadRepository: GetLeadByEmailRepositoryInterface = {
  getByEmail: jest.fn().mockResolvedValue(null)
}

const makeSut = (): GetLeadByEmailUseCase => {
  return new GetLeadByEmailUseCase(leadRepository)
}

describe('GetLeadByEmailUseCase', () => {
  test('should call LeadRepository.getByEmail once and with correct email', async () => {
    const sut = makeSut()

    await sut.execute('anyEmail@email.com')

    expect(leadRepository.getByEmail).toHaveBeenCalledTimes(1)
    expect(leadRepository.getByEmail).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return null when email does not exists', async () => {
    const sut = makeSut()

    const response = await sut.execute('anotherEmail@email.com')

    expect(response).toBeNull()
  })
})
