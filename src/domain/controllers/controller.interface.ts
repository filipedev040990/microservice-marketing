import { HttpRequest, HttpResponse } from '@/shared/types/http.type'

export interface ControllerInterface {
  execute(input: HttpRequest): Promise<HttpResponse>
}
