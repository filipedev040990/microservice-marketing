import { GetLeadByEmailUseCaseInterface } from '@/domain/usecases/get-lead-by-email.usecase.interface'
import { SaveLeadUseCaseInterface } from '@/domain/usecases/save-lead.usecase.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http.helper'
import { HttpRequest } from '@/shared/types/http.type'
import { SaveLeadController } from './save-lead.controller'

const getLeadByEmailUseCaseStub: jest.Mocked<GetLeadByEmailUseCaseInterface> = {
  execute: jest.fn()
}

const saveLeadUseCaseStub: jest.Mocked<SaveLeadUseCaseInterface> = {
  execute: jest.fn()
}

const makeSut = (): SaveLeadController => {
  return new SaveLeadController(getLeadByEmailUseCaseStub, saveLeadUseCaseStub)
}

const makeLeadInput = (): HttpRequest => ({
  body: {
    name: 'Any Name',
    email: 'anyEmail@email.com'
  }
})

let input: HttpRequest
let sut: SaveLeadController
describe('SaveLeadController', () => {
  beforeEach(() => {
    input = makeLeadInput()
    sut = makeSut()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null
    expect(await sut.execute(input)).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if email is not provided', async () => {
    input.body.email = null
    expect(await sut.execute(input)).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should call GetLeadByEmailUseCase once and with correct email', async () => {
    await sut.execute(input)
    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledTimes(1)
    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return 400 if email already exists', async () => {
    getLeadByEmailUseCaseStub.execute.mockResolvedValueOnce({
      id: '390d8ad3-185e-43c8-8c3f-48eaea7e46f5',
      name: 'Any Name',
      email: 'anyEmail@email.com',
      status: 'Interested',
      created_at: new Date()
    })
    expect(await sut.execute(input)).toEqual(badRequest(new InvalidParamError('This email already exists')))
  })

  test('should return 500 if GetLeadByEmailUseCase throw an exception', async () => {
    getLeadByEmailUseCaseStub.execute.mockRejectedValueOnce(new Error())
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })

  test('should call SaveLeadUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(saveLeadUseCaseStub.execute).toHaveBeenCalledTimes(1)
    expect(saveLeadUseCaseStub.execute).toHaveBeenCalledWith('Any Name', 'anyEmail@email.com')
  })

  test('should return 500 if SaveLeadUseCase throw an exception', async () => {
    saveLeadUseCaseStub.execute.mockRejectedValueOnce(new Error())
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    expect(await sut.execute(input)).toEqual(noContent())
  })
})
