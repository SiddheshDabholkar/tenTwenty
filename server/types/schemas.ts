import { Document } from "mongoose";
import { MaybeObjectId, TimeStampsAndId } from "./common";
import { QUESTIONS_TYPES, USER_ROLE } from "../constant/enums";

type UserType = Document &
  TimeStampsAndId & {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: USER_ROLE;
    token: string;
  };

type ContestType = Document &
  TimeStampsAndId & {
    name: string;
    description: string;
    startDateTime: Date;
    endDateTime: Date;
    createdBy: MaybeObjectId<UserType>;
    updatedBy: MaybeObjectId<UserType>;
    prizeId: MaybeObjectId<PrizeType>;
    wonBy: MaybeObjectId<WonbyType>;
    allowedRoles: USER_ROLE[];
  };

type QuestionType = Document &
  TimeStampsAndId & {
    question: string;
    type: QUESTIONS_TYPES;
    options: MaybeObjectId<AnswerOptionType>[];
    createdBy: MaybeObjectId<UserType>;
    updatedBy: MaybeObjectId<UserType>;
  };

type PrizeType = Document &
  TimeStampsAndId & {
    title: string;
    description: string;
  };

type AnswerOptionType = Document &
  TimeStampsAndId & {
    questionId: MaybeObjectId<QuestionType>;
    option: string;
    isCorrect: boolean;
    createdBy: MaybeObjectId<UserType>;
    updatedBy: MaybeObjectId<UserType>;
  };

type QuestionAnswerType = {
  questionId: MaybeObjectId<QuestionType>;
  isCorrect: boolean;
  userAnswer: AnswerOptionType[];
};

type SubmissionType = Document &
  TimeStampsAndId & {
    contestId: MaybeObjectId<ContestType>;
    userId: MaybeObjectId<UserType>;
    score: Number;
    timeTaken: Number;
    submittedAt: Date;
    contestOpenedAt: Date;
    questionsAnswers: QuestionAnswerType[];
  };

type WonbyType = Document &
  TimeStampsAndId & {
    userId: MaybeObjectId<UserType>;
    submissionId: MaybeObjectId<SubmissionType>;
    contestId: MaybeObjectId<ContestType>;
  };

export {
  UserType,
  WonbyType,
  SubmissionType,
  QuestionAnswerType,
  AnswerOptionType,
  PrizeType,
  QuestionType,
  ContestType,
};
