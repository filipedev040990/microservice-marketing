type InputLead = {
  name: string
  email: string
  status: string
}
export interface SaveLeadRepositoryInterface {
  save(input: InputLead): Promise<void>
}
