export interface SaveLead {
  execute(name: string, email: string): Promise<void>
}
