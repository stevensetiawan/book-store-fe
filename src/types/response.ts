export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  code: number;
  status: number;
  data: T;
}
