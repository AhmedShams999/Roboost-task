export interface ILoginUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginRes {
  accessToken: string;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
}

export interface AuthState {
  user: ILoginRes | null;
  token: string | null;
}

export interface IRegisterUser{
  username:string;
  email: string;
  password: string;
}
