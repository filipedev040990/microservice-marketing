import { SaveLeadRepositoryInterface } from '@/domain/repositories/save-lead.repository.interface'
import { SaveLeadUseCase } from './save-lead.usecase'
import MockDate from 'mockdate'

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => '390d8ad3-185e-43c8-8c3f-48eaea7e46f5')
}))

const leadRepository: jest.Mocked<SaveLeadRepositoryInterface> = {
  save: jest.fn()
}

const makeSut = (): SaveLeadUseCase => {
  return new SaveLeadUseCase(leadRepository)
}

describe('SaveLeadUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call LeadRepository.save once and with correct values', async () => {
    const sut = makeSut()

    await sut.execute('Any Name', 'anyEmail@email.com')

    expect(leadRepository.save).toHaveBeenCalledTimes(1)
    expect(leadRepository.save).toHaveBeenCalledWith({
      id: '390d8ad3-185e-43c8-8c3f-48eaea7e46f5',
      name: 'Any Name',
      email: 'anyEmail@email.com',
      status: 'Interested',
      created_at: new Date()
    })
  })

  test('should return server error if LeadRepository.save throws', async () => {
    const sut = makeSut()

    leadRepository.save.mockRejectedValueOnce(new Error())

    const response = sut.execute('Any Name', 'anyEmail@email.com')

    await expect(response).rejects.toThrow()
  })
})
