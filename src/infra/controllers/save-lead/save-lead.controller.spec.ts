import { SaveLeadUseCaseInterface } from '@/domain/usecases/save-lead.usecase.interface'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest } from '@/shared/helpers/http.helper'
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
  beforeAll(() => {
    getLeadByEmailUseCaseStub = makeGetLeadByEmailUseCaseStub()
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

  test('should call GetLeadByEmailUseCase once and with correct values', async () => {
    const sut = makeSut()
    const input = makeLeadInput()
    await sut.execute(input)

    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledTimes(1)
    expect(getLeadByEmailUseCaseStub.execute).toHaveBeenCalledWith('anyEmail@email.com')
  })
})
