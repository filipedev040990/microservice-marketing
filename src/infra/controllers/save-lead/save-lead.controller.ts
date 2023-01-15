import { ControllerInterface } from '@/domain/controllers/controller.interface'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types/http.type'

export class SaveLeadController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<HttpResponse> {
    for (const field of ['name']) {
      if (!input.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    return null
  }
}
