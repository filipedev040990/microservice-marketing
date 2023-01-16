import { ServerError } from '../errors/server.error'
import { HttpResponse } from '../types/http.type'

export const badRequest = (body: any): HttpResponse => ({
  statusCode: 400,
  body
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})
