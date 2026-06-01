import jwt from "jsonwebtoken";
import config from "../config";

export const generateToken = (payload: {
  id: number;
  name: string;
  role: string;
}) => {
  return jwt.sign(payload, config.jwt_secret, {
    expiresIn: config.jwt_expires_in,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt_secret);
};

export const jwtUtils = {
  generateToken,
  verifyToken,
};
