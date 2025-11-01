import { USER_ROLE } from "../constant/enums";
import {
  CONTEST_MESSAGES,
  QUESTION_MESSAGES,
  USER_MESSAGES,
} from "../constant/message";
import { InputQuestionType } from "../types/common";

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

type validateRegisterPayloadProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
const validateRegisterPayload = ({
  email,
  password,
  firstName,
  lastName,
}: validateRegisterPayloadProps) => {
  if (firstName.trim().length < 3) return USER_MESSAGES.FIRST_NAME_TOO_SMALL;
  if (lastName.trim().length < 3) return USER_MESSAGES.LAST_NAME_TOO_SMALL;
  if (!validateEmail(email)) return USER_MESSAGES.INVALID_EMAIL;
  if (password.trim().length < 6) return USER_MESSAGES.PASSWORD_TOO_SMALL;
  if (password.trim().length > 16) return USER_MESSAGES.PASSWORD_TOO_LARGE;
  if (firstName.trim().length > 20) return USER_MESSAGES.FIRST_NAME_TOO_LARGE;
  if (lastName.trim().length > 20) return USER_MESSAGES.LAST_NAME_TOO_LARGE;

  return null;
};

type validateLoginPayloadProps = {
  email: string;
  password: string;
};
const validateLoginPayload = ({
  email,
  password,
}: validateLoginPayloadProps) => {
  if (!validateEmail(email)) return USER_MESSAGES.INVALID_EMAIL;
  if (password.trim().length < 6) return USER_MESSAGES.PASSWORD_TOO_SMALL;
  if (password.trim().length > 16) return USER_MESSAGES.PASSWORD_TOO_LARGE;
  return null;
};

type validateQuestionsProps = {
  questions: InputQuestionType[];
};
const validateQuestions = ({ questions }: validateQuestionsProps) => {
  const isValid = questions.every((q) => {
    return q.question.trim().length > 0;
  });
  if (!isValid) {
    return QUESTION_MESSAGES.QUESTION_REQUIRED;
  }
  const questionTooLong = questions.some((q) => {
    return q.question.trim().length > 100;
  });
  if (questionTooLong) {
    return QUESTION_MESSAGES.QUESTION_TOO_LONG;
  }
  const questionTooSmall = questions.some((q) => {
    return q.question.trim().length < 3;
  });
  if (questionTooSmall) {
    return QUESTION_MESSAGES.QUESTION_TOO_SMALL;
  }
  const isOptionsValid = questions.every((q) => {
    return q.options.every((o) => o.option.trim().length > 0);
  });
  if (!isOptionsValid) {
    return QUESTION_MESSAGES.OPTION_REQUIRED;
  }
  const optionTooLong = questions.some((q) => {
    return q.options.some((o) => o.option.trim().length > 100);
  });
  if (optionTooLong) {
    return QUESTION_MESSAGES.OPTION_TOO_LONG;
  }
  const optionTooSmall = questions.some((q) => {
    return q.options.some((o) => o.option.trim().length < 3);
  });
  if (optionTooSmall) {
    return QUESTION_MESSAGES.OPTION_TOO_SMALL;
  }
  return null;
};

type validateCreateContestPayloadProps = {
  name: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  role: USER_ROLE[];
  questions: InputQuestionType[];
};
const validateCreateContestPayload = ({
  name,
  description,
  startDateTime,
  endDateTime,
  role,
  questions,
}: validateCreateContestPayloadProps) => {
  if (name.trim().length < 3) return CONTEST_MESSAGES.CONTEST_NAME_TOO_SMALL;
  if (name.trim().length > 20) return CONTEST_MESSAGES.CONTEST_NAME_TOO_LARGE;
  if (description.trim().length < 3)
    return CONTEST_MESSAGES.CONTEST_DESCRIPTION_TOO_SMALL;
  if (description.trim().length > 500)
    return CONTEST_MESSAGES.CONTEST_DESCRIPTION_TOO_LARGE;
  if (!startDateTime) {
    return CONTEST_MESSAGES.START_DATE_REQUIRED;
  }
  if (role.length === 0) {
    return CONTEST_MESSAGES.ROLE_REQUIRED;
  }
  const invalidRole = role.filter((r) => !Object.values(USER_ROLE).includes(r));
  if (invalidRole.length > 0) {
    return CONTEST_MESSAGES.INVALID_ROLE;
  }
  if (!endDateTime) {
    return CONTEST_MESSAGES.END_DATE_REQUIRED;
  }
  if (startDateTime > endDateTime)
    return CONTEST_MESSAGES.CONTEST_STARTDATE_CAN_NOT_BE_AFTER_ENDDATE;
  return null;
};

export {
  validateRegisterPayload,
  validateLoginPayload,
  validateCreateContestPayload,
};
