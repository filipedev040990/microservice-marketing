import { EmailValidatorAdapter } from './email-validator.adapter'
import validator from 'validator'

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

  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const response = sut.execute('invalidEmail@email.com')
    expect(response).toBe(false)
  })
})
