export interface UpdateLeadUseCaseInterface {
  execute(email: string, status: string): Promise<void>
}
