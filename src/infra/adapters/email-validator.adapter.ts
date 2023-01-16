import validator from 'validator'
import { EmailValitorInterface } from '@/domain/validation/email-validator.interface'

export class EmailValidatorAdapter implements EmailValitorInterface {
  execute (email: string): boolean {
    return validator.isEmail(email)
  }
}
