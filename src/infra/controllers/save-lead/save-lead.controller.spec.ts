import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest } from '@/shared/helpers/http.helper'
import { HttpRequest } from '@/shared/types/http.type'
import { SaveLeadController } from './save-lead.controller'

const makeSut = (): SaveLeadController => {
  return new SaveLeadController()
}

const makeLeadInput = (): HttpRequest => ({
  body: {
    name: 'Any Name',
    email: 'anyEmail@email.com'
  }
})

describe('SaveLeadController', () => {
  test('should return 400 if name is not provided', async () => {
    const sut = makeSut()
    const input = makeLeadInput()
    input.body.name = null
    const response = await sut.execute(input)
    expect(response).toEqual(badRequest(new MissingParamError('name')))
  })
})
