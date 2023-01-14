export type InputLead = {
  name: string
  email: string
}

export interface SaveLead {
  execute(input: InputLead): Promise<void>
}
