import { Request } from "express";

export interface JwtPayload {
  id: number;
  name: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
