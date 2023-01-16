import { ControllerInterface } from '@/domain/controllers/controller.interface'
import { GetLeadByEmailUseCaseInterface } from '@/domain/usecases/get-lead-by-email.usecase.interface'
import { SaveLeadUseCaseInterface } from '@/domain/usecases/save-lead.usecase.interface'
import { InvalidParamError } from '@/shared/errors/invalid-param.error'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest, serverError } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.type'

export class SaveLeadController implements ControllerInterface {
  constructor (
    private readonly getLeadByEmailUseCase: GetLeadByEmailUseCaseInterface,
    private readonly saveLeadUseCase: SaveLeadUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      for (const field of ['name', 'email']) {
        if (!input.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const emailExists = await this.getLeadByEmailUseCase.execute(input.body.email)
      if (emailExists) {
        return badRequest(new InvalidParamError('This email already exists'))
      }

      await this.saveLeadUseCase.execute(input.body.name, input.body.email)
    } catch (error) {
      return serverError(error)
    }
  }
}
