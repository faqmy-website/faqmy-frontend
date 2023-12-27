export interface UserResource {
  id: string;
  name: string;
  phone: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
}

export interface InputUser {
  name?: string;
  password?: string;
  email?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
  phone?: string;
}

export interface UserInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
}
