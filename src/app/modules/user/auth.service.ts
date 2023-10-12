import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import {
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
  IUser,
} from "./auth.interface";
import { User } from "./auth.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { email, password } = payload;
  // Check user exist
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }
  // Macth Password
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist?.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Create Access Token & Refresh Token
  const { _id } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    {
      _id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      _id,
    },
    config.jwt.refresh_secrect as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secrect as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Token");
  }
  const { _id } = verifiedToken;
  const isUserExist = await User.findOne({ _id });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, " User does not exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist.id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const UserService = {
  createUser,
  loginUser,
  refreshToken,
};
