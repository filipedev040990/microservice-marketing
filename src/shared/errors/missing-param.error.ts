export class MissingParamError extends Error {
  constructor (param: string) {
    super(`Missing param error: ${param}`)
    this.name = 'MissingParamError'
  }
}
