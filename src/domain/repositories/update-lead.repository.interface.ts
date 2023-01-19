export interface UpdateLeadRepositoryInterface {
  update(email: string, status: string): Promise<void>
}
