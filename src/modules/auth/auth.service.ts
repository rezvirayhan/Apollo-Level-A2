import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../../utility/jwt";
import type { ILoginPayload, ISignupPayload } from "./auth.interface";
import { authModels } from "./auth.model";

const signupUser = async (payload: ISignupPayload) => {
  const { name, email, password } = payload;

  if (!name || !email || !password) {
    throw {
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Name, email and password are required",
    };
  }

  const existingUser = await authModels.findUserByEmail(email);

  if (existingUser) {
    throw {
      statusCode: StatusCodes.CONFLICT,
      message: "User already exists with this email",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authModels.createUser(payload, hashedPassword);

  return user;
};

const loginUser = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  const user = await authModels.findUserByEmail(email);

  if (!user) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "Invalid Credentials",
    };
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "Invalid Credentials",
    };
  }

  const token = generateToken({
    id: user.id,
    name: user.name,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

export const authServices = {
  signupUser,
  loginUser,
};
