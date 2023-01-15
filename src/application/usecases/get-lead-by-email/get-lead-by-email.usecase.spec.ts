import { Lead } from '@/domain/entities/lead.entity'
import { GetLeadByEmailRepositoryInterface } from '@/domain/repositories/get-lead-by-email.repository.interface'
import constants from '@/shared/constants'
import { GetLeadByEmailUseCase } from './get-lead-by-email.usecase'
import MockDate from 'mockdate'

const leadRepository: jest.Mocked<GetLeadByEmailRepositoryInterface> = {
  getByEmail: jest.fn().mockResolvedValue(null)
}

const makeSut = (): GetLeadByEmailUseCase => {
  return new GetLeadByEmailUseCase(leadRepository)
}

const fakeLead: Lead = {
  id: '390d8ad3-185e-43c8-8c3f-48eaea7e46f5',
  name: 'Any Name',
  email: 'anyEmail@email.com',
  status: constants.LEAD_STATUS_INTERESTED,
  created_at: new Date('2023-01-15')
}

describe('GetLeadByEmailUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date('2023-01-15'))
  })
  afterAll(() => {
    MockDate.reset()
  })
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

  test('should return an Lead on success', async () => {
    const sut = makeSut()

    leadRepository.getByEmail.mockResolvedValueOnce(fakeLead)

    const response = await sut.execute('anyEmail@email.com')

    expect(response).toBeTruthy()
    expect(response).toEqual({
      id: '390d8ad3-185e-43c8-8c3f-48eaea7e46f5',
      name: 'Any Name',
      email: 'anyEmail@email.com',
      status: constants.LEAD_STATUS_INTERESTED,
      created_at: new Date()
    })
  })
})
