import { SaveLeadUseCaseInterface } from '@/domain/usecases/save-lead.usecase.interface'
import { InvalidParamError } from '@/shared/errors/invalid-param.error'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest, serverError } from '@/shared/helpers/http.helper'
import { HttpRequest } from '@/shared/types/http.type'
import { SaveLeadController } from './save-lead.controller'

const makeGetLeadByEmailUseCaseStub = (): SaveLeadUseCaseInterface => ({
  execute: jest.fn()
})

const makeSut = (): SaveLeadController => {
  return new SaveLeadController(getLeadByEmailUseCaseStub)
}

const makeLeadInput = (): HttpRequest => ({
  body: {
    name: 'Any Name',
    email: 'anyEmail@email.com'
  }
})

let getLeadByEmailUseCaseStub

describe('SaveLeadController', () => {
  beforeEach(() => {
    getLeadByEmailUseCaseStub = makeGetLeadByEmailUseCaseStub()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should return 400 if name is not provided', async () => {
    const sut = makeSut()
    const input = makeLeadInput()
    input.body.name = null
    const response = await sut.execute(input)
    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if email is not provided', async () => {
    const sut = makeSut()
    const input = makeLeadInput()
    input.body.email = null
    const response = await sut.execute(input)
    expect(response).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should call GetLeadByEmailUseCase once and with correct email', async () => {
    const sut = makeSut()
    const input = makeLeadInput()
    await sut.execute(input)

    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledTimes(1)
    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return 400 if email already exists', async () => {
    const sut = makeSut()
    const input = makeLeadInput()

    getLeadByEmailUseCaseStub.execute.mockResolvedValueOnce({
      id: '390d8ad3-185e-43c8-8c3f-48eaea7e46f5',
      name: 'Any Name',
      email: 'anyEmail@email.com',
      status: 'Interested',
      created_at: new Date()
    })

    const response = await sut.execute(input)

    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledTimes(1)
    expect(response).toEqual(badRequest(new InvalidParamError('This email already exists')))
  })

  test('should return 500 if GetLeadByEmailUseCase throw an exception', async () => {
    const sut = makeSut()
    const input = makeLeadInput()

    getLeadByEmailUseCaseStub.execute.mockRejectedValueOnce(new Error())

    const error = await sut.execute(input)

    expect(error).toEqual(serverError(new Error()))
  })
})
