import { HttpResponse } from '../types/http.type'

export const badRequest = (body: any): HttpResponse => ({
  statusCode: 400,
  body
})
