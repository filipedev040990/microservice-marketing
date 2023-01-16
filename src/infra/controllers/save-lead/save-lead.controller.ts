import { ControllerInterface } from '@/domain/controllers/controller.interface'
import { GetLeadByEmailUseCaseInterface } from '@/domain/usecases/get-lead-by-email.usecase.interface'
import { SaveLeadUseCaseInterface } from '@/domain/usecases/save-lead.usecase.interface'
import { EmailValitorInterface } from '@/domain/validation/email-validator.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.type'

export class SaveLeadController implements ControllerInterface {
  constructor (
    private readonly emailValidator: EmailValitorInterface,
    private readonly getLeadByEmailUseCase: GetLeadByEmailUseCaseInterface,
    private readonly saveLeadUseCase: SaveLeadUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const missingParamName = this.validateRequiredFields(input)
      if (missingParamName) {
        return badRequest(new MissingParamError(missingParamName))
      }

      this.emailValidator.execute(input.body.email)
      const emailExists = await this.getLeadByEmailUseCase.execute(input.body.email)
      if (emailExists) {
        return badRequest(new InvalidParamError('This email already exists'))
      }

      await this.saveLeadUseCase.execute(input.body.name, input.body.email)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  validateRequiredFields = (input): any => {
    for (const field of ['name', 'email']) {
      if (!input.body[field]) {
        return field
      }
    }
  }
}
