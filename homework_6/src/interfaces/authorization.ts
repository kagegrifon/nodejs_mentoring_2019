export interface AuthServiceInterface {
  login: (data: LoginParams) => Promise<any>;
}

export type LoginParams = {
  username: number,
  password: number[],
}