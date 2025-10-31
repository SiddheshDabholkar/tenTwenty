import { MaybeString } from "@/types/common";
import { AnswerOptionType, UserType } from "@/types/schemas";

const getUserFullName = (user: UserType) => {
  return `${user.firstName} ${user.lastName}`;
};

const getAnswerOptions = (data: MaybeString<AnswerOptionType>[]) => {
  return data.map((m) => m as AnswerOptionType);
};

export { getUserFullName, getAnswerOptions };
