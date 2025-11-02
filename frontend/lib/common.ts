import { Maybe, MaybeArray, MaybeString, TranslateKey } from "@/types/common";
import {
  AnswerOptionType,
  ContestType,
  PrizeType,
  QuestionType,
  UserType,
} from "@/types/schemas";
import { handleTranslate } from "./translate";

const getUserFullName = (user: UserType) => {
  return `${user.firstName} ${user.lastName}`;
};

const getAnswerOptions = (data: MaybeString<AnswerOptionType>[]) => {
  return data.map((m) => m as AnswerOptionType);
};

const getPrizeDetails = (data: MaybeString<PrizeType> | Maybe<PrizeType>) => {
  if (typeof data === "string") {
    return null;
  }
  if (data?._id) {
    return data as PrizeType;
  }
  return null;
};

const getQuestions = (
  data: MaybeArray<MaybeString<QuestionType>> | MaybeArray<QuestionType>
) => {
  return data.map((m) => m as QuestionType);
};

const getQuestionsOptions = (
  data: MaybeArray<MaybeString<AnswerOptionType>>
) => {
  return data.map((m) => m as AnswerOptionType);
};

const getContestDetails = (
  data: MaybeString<ContestType> | Maybe<ContestType>
) => {
  if (typeof data === "string") {
    return null;
  }
  if (data?._id) {
    return data as ContestType;
  }
  return null;
};

const getUserDetails = (data: MaybeString<UserType> | Maybe<UserType>) => {
  if (typeof data === "string") {
    return null;
  }
  if (data?._id) {
    return data as UserType;
  }
  return null;
};

const getErrorMessage = (msg: Maybe<TranslateKey>) => {
  return msg ? handleTranslate(msg) : "Something went wrong! Please try again.";
};

export {
  getUserFullName,
  getAnswerOptions,
  getPrizeDetails,
  getQuestions,
  getQuestionsOptions,
  getContestDetails,
  getUserDetails,
  getErrorMessage,
};
