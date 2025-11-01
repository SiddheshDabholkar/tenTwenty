import { Maybe, MaybeArray, MaybeString } from "@/types/common";
import {
  AnswerOptionType,
  PrizeType,
  QuestionType,
  UserType,
} from "@/types/schemas";

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

export { getUserFullName, getAnswerOptions, getPrizeDetails, getQuestions };
