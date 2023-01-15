type InputLead = {
  id: string
  name: string
  email: string
  status: string
  created_at: Date
  updated_at?: Date
}
export interface SaveLeadRepositoryInterface {
  save(input: InputLead): Promise<void>
}
