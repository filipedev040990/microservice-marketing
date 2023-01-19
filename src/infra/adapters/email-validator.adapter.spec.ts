import { EmailValidatorAdapter } from './email-validator.adapter'

jest.mock('validator', () => ({
  isEmail: () => {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator Adapter', () => {
  test('should return true if validator returns true', () => {
    const sut = makeSut()
    const response = sut.execute('validEmail@email.com')
    expect(response).toBe(true)
  })
})
