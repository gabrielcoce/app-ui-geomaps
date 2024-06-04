export interface ISignin {
  username: string;
  password: string;
}

export interface IRSignin {
  username: string;
  accessToken: string;
  roles: string[];
}

export interface IToken {
  sub: string;
  exp: number;
}
