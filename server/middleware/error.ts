import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { formatResponse } from "../utils/common";

const errorMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  res.status(500).json(
    formatResponse({
      message: err?.message ?? "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    })
  );
};

export { errorMiddleware };
