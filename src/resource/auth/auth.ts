export interface InputUserCreate {
  email: string;
  password: string;
}

export interface InputSignIn {
  grant_type?: string;
  username: string;
  password: string;
  scope?: string;
  client_id?: string;
  client_secret?: string;
}

export interface TokenResource {
  access_token: string;
  token_type: string;
}

export interface Token {
  token: string;
  tokenType: string;
}
