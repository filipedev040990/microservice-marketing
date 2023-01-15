export interface SaveLeadUseCaseInterface {
  execute(name: string, email: string): Promise<void>
}
