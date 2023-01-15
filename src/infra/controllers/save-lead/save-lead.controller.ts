import { ControllerInterface } from '@/domain/controllers/controller.interface'
import { GetLeadByEmailUseCaseInterface } from '@/domain/usecases/get-lead-by-email.usecase.interface'
import { InvalidParamError } from '@/shared/errors/invalid-param.error'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.type'

export class SaveLeadController implements ControllerInterface {
  constructor (private readonly getLeadByEmailUseCase: GetLeadByEmailUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    for (const field of ['name', 'email']) {
      if (!input.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const { email } = input.body
    const emailExists = await this.getLeadByEmailUseCase.execute(email)
    if (emailExists) {
      return badRequest(new InvalidParamError('This email already exists'))
    }
    return null
  }
}
