import jwt from "jsonwebtoken";
import type { Response, NextFunction, Request } from "express";
import { User } from "../models/User";
import { formatResponse } from "../utils/common";
import { JWT_SECRET } from "../constant/envs";
import { COMMON_MESSAGES } from "../constant/message";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json(
      formatResponse({
        message: COMMON_MESSAGES.INVALID_AUTH_TOKEN,
        success: false,
        data: null,
      })
    );
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json(
      formatResponse({
        message: COMMON_MESSAGES.INVALID_AUTH_TOKEN,
        success: false,
        data: null,
      })
    );
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userId = user?.id;
    if (userId) {
      const userDetails = await User.findOne({ _id: userId });
      if (!userDetails) {
        return res.status(401).json(
          formatResponse({
            message: COMMON_MESSAGES.UNAUTHORIZED,
            success: false,
            data: null,
          })
        );
      }
      req.user = userDetails;
      next();
    } else {
      return res.status(401).json(
        formatResponse({
          message: COMMON_MESSAGES.UNAUTHORIZED,
          success: false,
          data: null,
        })
      );
    }
  } catch (err) {
    console.log("Something went wrong in authMiddleware", err);
    return res.status(401).json(
      formatResponse({
        message: COMMON_MESSAGES.TOKEN_EXPIRED,
        success: false,
        data: null,
      })
    );
  }
};

export { authMiddleware };
