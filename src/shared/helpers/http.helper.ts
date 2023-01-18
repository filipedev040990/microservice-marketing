import { ServerError } from '../errors/server.error'
import { HttpResponse } from '../types/http.type'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
