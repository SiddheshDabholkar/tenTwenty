import type { Response, NextFunction, Request } from "express";
import { USER_ROLE } from "../constant/enums";
import { UserType } from "../types/schemas";
import { formatResponse } from "../utils/common";
import { COMMON_MESSAGES } from "../constant/message";

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserType;
  if (user.role !== USER_ROLE.ADMIN) {
    return res.status(401).json(
      formatResponse({
        message: COMMON_MESSAGES.TOKEN_EXPIRED,
        success: false,
        data: null,
      })
    );
  }
  next();
};

export { adminMiddleware };
