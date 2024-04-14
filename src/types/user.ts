export interface User2 {
  id?: number;
  name: string;
  email: string;
  points: number;
  hashedPassword?: string;
  password?: string;
  created_at: Date;
}

export interface UserToken {
  id?: number;
  name: string;
  email: string;
  points: number;
}

export interface SignInParams {
  email: string;
  password: string;
  position: string;
}

export interface SignInResponse {
  token: string;
}
