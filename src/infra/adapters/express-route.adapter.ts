import { Request, Response } from 'express'
import { ControllerInterface } from '@/domain/controllers/controller.interface'
import { HttpRequest, HttpResponse } from '@/shared/types/http.type'

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      body: req.body
    }

    const output: HttpResponse = await controller.execute(input)
    const bodyResponse = output?.statusCode === 500 ? { error: output.body.message } : output.body
    res.status(output.statusCode).json(bodyResponse)
  }
}
