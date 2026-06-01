export type UserRole = "contributor" | "maintainer";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
