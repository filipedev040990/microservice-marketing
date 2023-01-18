import { EmailValidatorAdapter } from '@/infra/adapters/email-validator.adapter'
import { SaveLeadController } from '@/infra/controllers/save-lead/save-lead.controller'
import { makeGetLeadByEmailUseCaseFactory } from '../usecases/get-lead-by-email-usecase.factory'
import { makeSaveLeadUseCaseFactory } from '../usecases/save-lead-usecase.factory'

export const makeSaveLeadControllerFactory = (): SaveLeadController => {
  const emailValidator = new EmailValidatorAdapter()
  return new SaveLeadController(emailValidator, makeGetLeadByEmailUseCaseFactory(), makeSaveLeadUseCaseFactory())
}
