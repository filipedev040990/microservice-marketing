export interface SaveLeadInterface {
  execute(name: string, email: string): Promise<void>
}
