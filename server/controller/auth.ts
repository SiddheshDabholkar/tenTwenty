import { Request, Response } from "express";
import {
  validateLoginPayload,
  validateRegisterPayload,
} from "../utils/validation";
import { formatResponse } from "../utils/common";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { TOKEN_EXPIRY } from "../constant/common";
import { JWT_SECRET } from "../constant/envs";
import { USER_MESSAGES } from "../constant/message";
import { USER_ROLE } from "../constant/enums";

const register = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  const validatedError = validateRegisterPayload({
    email,
    password,
    firstName,
    lastName,
  });
  if (validatedError) {
    return res.status(400).json(
      formatResponse({
        message: validatedError,
        data: null,
        success: false,
      })
    );
  }
  const userDetails = await User.findOne({ email: email });
  if (userDetails) {
    return res.status(409).json(
      formatResponse({
        message: USER_MESSAGES.USER_ALREADY_EXISTS,
        data: null,
        success: false,
      })
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const createdUser = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role: USER_ROLE.NORMAL,
  });
  const token = await jwt.sign(
    {
      id: createdUser._id,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
  const updatedUser = await User.findOneAndUpdate(
    { _id: createdUser._id },
    { token },
    { new: true }
  );
  return res.status(200).json(
    formatResponse({
      message: USER_MESSAGES.USER_CREATION_SUCCESS,
      data: updatedUser,
      success: true,
    })
  );
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const validatedError = validateLoginPayload({
    email,
    password,
  });
  if (validatedError) {
    return res.status(400).json(
      formatResponse({
        message: validatedError,
        data: null,
        success: false,
      })
    );
  }
  const userDetails = await User.findOne({ email: email });
  if (!userDetails) {
    return res.status(401).json(
      formatResponse({
        message: USER_MESSAGES.USER_NOT_FOUND,
        data: null,
        success: false,
      })
    );
  }
  const isPasswordValid = await bcrypt.compare(password, userDetails.password);
  if (!isPasswordValid) {
    return res.status(401).json(
      formatResponse({
        message: USER_MESSAGES.INVALID_CREDENTIALS,
        data: null,
        success: false,
      })
    );
  }
  const token = await jwt.sign(
    {
      id: userDetails._id,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
  const updatedUser = await User.findOneAndUpdate(
    { _id: userDetails._id },
    { token },
    { new: true }
  );
  return res.status(200).json(
    formatResponse({
      message: USER_MESSAGES.USER_LOGIN_SUCCESS,
      data: updatedUser,
      success: true,
    })
  );
};

export { register, login };
