import { ObjectId } from "mongoose";
import { UserType } from "./schemas";

type Maybe<T> = T | null | undefined;
type MaybeArray<T> = T | T[];
type MaybeObjectId<T> = Maybe<ObjectId | T>;

type TimeStampsAndId = {
  _id: ObjectId;
  createdOn: Date;
  updatedOn: Date;
  createdAt: Date;
  updatedAt: Date;
};

type RequestWithUser = Request & { user: UserType };

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

type InputQuestionType = {
  question: string;
  options: {
    option: string;
    isCorrect: boolean;
  }[];
};

export type {
  Maybe,
  MaybeArray,
  MaybeObjectId,
  TimeStampsAndId,
  RequestWithUser,
  InputQuestionType,
};
