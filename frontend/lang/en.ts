import {
  COMMON_MESSAGES,
  USER_MESSAGES,
  CONTEST_MESSAGES,
  QUESTION_MESSAGES,
  PRIZE_MESSAGES,
  SUBMISSION_MESSAGES,
} from "@/constant/messages";

const commonMessages = {
  [COMMON_MESSAGES.INVALID_AUTH_TOKEN]:
    "Authentication token is invalid. Please log in again.",
  [COMMON_MESSAGES.TOKEN_EXPIRED]:
    "Your session has expired. Please sign in again.",
  [COMMON_MESSAGES.UNAUTHORIZED]:
    "You are not authorized to perform this action.",
};

const userMessages = {
  [USER_MESSAGES.USER_ALREADY_EXISTS]: "User already exists.",
  [USER_MESSAGES.LAST_NAME_TOO_SMALL]: "Last name is too small.",
  [USER_MESSAGES.FIRST_NAME_TOO_SMALL]: "First name is too small.",
  [USER_MESSAGES.INVALID_EMAIL]: "Invalid email.",
  [USER_MESSAGES.PASSWORD_TOO_SMALL]: "Password is too small.",
  [USER_MESSAGES.PASSWORD_TOO_LARGE]: "Password is too large.",
  [USER_MESSAGES.FIRST_NAME_TOO_LARGE]: "First name is too large.",
  [USER_MESSAGES.LAST_NAME_TOO_LARGE]: "Last name is too large.",
  [USER_MESSAGES.USER_CREATION_SUCCESS]: "User created successfully.",
  [USER_MESSAGES.USER_CREATION_FAILED]: "User creation failed.",
  [USER_MESSAGES.USER_NOT_FOUND]: "User not found.",
  [USER_MESSAGES.USER_LOGIN_SUCCESS]: "User logged in successfully.",
  [USER_MESSAGES.USER_LOGIN_FAILED]: "User login failed.",
  [USER_MESSAGES.INVALID_CREDENTIALS]: "Invalid credentials.",
  [USER_MESSAGES.USER_FETCH_SUCCESS]: "User fetched successfully.",
  [USER_MESSAGES.USER_FETCHED_FAILED]: "User fetch failed.",
  [USER_MESSAGES.USER_ID_REQUIRED]: "User id is required.",
};

export const englishMessage = {
  ...commonMessages,
  ...userMessages,
};
