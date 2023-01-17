import { GetLeadByEmailUseCaseInterface } from '@/domain/usecases/get-lead-by-email.usecase.interface'
import { SaveLeadUseCaseInterface } from '@/domain/usecases/save-lead.usecase.interface'
import { EmailValitorInterface } from '@/domain/validation/email-validator.interface'
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

const makeEmailValidator = (): EmailValitorInterface => {
  class EmailValidator implements EmailValitorInterface {
    execute (email: string): boolean {
      return true
    }
  }
  return new EmailValidator()
}

type SutTypes = {
  sut: SaveLeadController
  emailValidator: EmailValitorInterface
}

const makeSut = (): SutTypes => {
  const emailValidator = makeEmailValidator()
  const sut = new SaveLeadController(emailValidator, getLeadByEmailUseCaseStub, saveLeadUseCaseStub)
  return { sut, emailValidator }
}

const makeLeadInput = (): HttpRequest => ({
  body: {
    name: 'Any Name',
    email: 'anyEmail@email.com'
  }
})

let input: HttpRequest
describe('SaveLeadController', () => {
  beforeEach(() => {
    input = makeLeadInput()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should return 400 if name is not provided', async () => {
    const { sut } = makeSut()
    input.body.name = null
    expect(await sut.execute(input)).toEqual(badRequest(new MissingParamError('name')))
  })

  test('should return 400 if email is not provided', async () => {
    const { sut } = makeSut()
    input.body.email = null
    expect(await sut.execute(input)).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should call EmailValidator once and with correct email', async () => {
    const { sut, emailValidator } = makeSut()
    const spy = jest.spyOn(emailValidator, 'execute')
    await sut.execute(input)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return 400 if email is invalid', async () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'execute').mockReturnValueOnce(false)
    expect(await sut.execute(input)).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should call GetLeadByEmailUseCase once and with correct email', async () => {
    const { sut } = makeSut()
    await sut.execute(input)
    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledTimes(1)
    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return 400 if email already exists', async () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    getLeadByEmailUseCaseStub.execute.mockRejectedValueOnce(new Error())
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })

  test('should call SaveLeadUseCase once and with correct values', async () => {
    const { sut } = makeSut()
    await sut.execute(input)
    expect(saveLeadUseCaseStub.execute).toHaveBeenCalledTimes(1)
    expect(saveLeadUseCaseStub.execute).toHaveBeenCalledWith('Any Name', 'anyEmail@email.com')
  })

  test('should return 500 if SaveLeadUseCase throw an exception', async () => {
    const { sut } = makeSut()
    saveLeadUseCaseStub.execute.mockRejectedValueOnce(new Error())
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    expect(await sut.execute(input)).toEqual(noContent())
  })
})
