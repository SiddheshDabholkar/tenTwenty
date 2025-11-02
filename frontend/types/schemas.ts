import { QUESTIONS_TYPES, USER_ROLE } from "@/constant/enums";
import { MaybeArray, MaybeString } from "./common";

type TimeStampsAndId = {
  _id: string;
  createdOn: Date;
  updatedOn: Date;
  createdAt: Date;
  updatedAt: Date;
};

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
    createdBy: MaybeString<UserType>;
    updatedBy: MaybeString<UserType>;
    prizeId: MaybeString<PrizeType>;
    wonBy: MaybeString<WonbyType>;
    allowedRoles: USER_ROLE[];
    questions: MaybeArray<MaybeString<QuestionType>>;

    hasSubmitted: boolean;
  };

type QuestionType = Document &
  TimeStampsAndId & {
    question: string;
    type: QUESTIONS_TYPES;
    options: MaybeString<AnswerOptionType>[];
    createdBy: MaybeString<UserType>;
    updatedBy: MaybeString<UserType>;
  };

type PrizeType = Document &
  TimeStampsAndId & {
    title: string;
    description: string;
  };

type AnswerOptionType = Document &
  TimeStampsAndId & {
    questionId: MaybeString<QuestionType>;
    option: string;
    isCorrect: boolean;
    createdBy: MaybeString<UserType>;
    updatedBy: MaybeString<UserType>;
  };

type QuestionAnswerType = {
  questionId: MaybeString<QuestionType>;
  isCorrect: boolean;
  userAnswer: AnswerOptionType[];
};

type SubmissionType = Document &
  TimeStampsAndId & {
    contestId: MaybeString<ContestType>;
    userId: MaybeString<UserType>;
    score: number;
    timeTaken: number;
    submittedAt: Date;
    contestOpenedAt: Date;
    questionsAnswers: QuestionAnswerType[];
  };

type WonbyType = Document &
  TimeStampsAndId & {
    userId: MaybeString<UserType>;
    submissionId: MaybeString<SubmissionType>;
    contestId: MaybeString<ContestType>;
  };

export type {
  UserType,
  WonbyType,
  SubmissionType,
  QuestionAnswerType,
  AnswerOptionType,
  PrizeType,
  QuestionType,
  ContestType,
};
