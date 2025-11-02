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
  [USER_MESSAGES.USER_UPDATE_SUCCESS]: "User updated successfully.",
  [USER_MESSAGES.USER_UPDATE_FAILED]: "User update failed.",
};

const questionMessages = {
  [QUESTION_MESSAGES.QUESTION_REQUIRED]: "Question is required.",
  [QUESTION_MESSAGES.QUESTION_TOO_LONG]: "Question is too long.",
  [QUESTION_MESSAGES.QUESTION_TOO_SMALL]: "Question is too small.",
  [QUESTION_MESSAGES.OPTION_REQUIRED]: "Option is required.",
  [QUESTION_MESSAGES.OPTION_TOO_LONG]: "Option is too long.",
  [QUESTION_MESSAGES.OPTION_TOO_SMALL]: "Option is too small.",
  [QUESTION_MESSAGES.QUESTION_ID_REQUIRED]: "Question id is required.",
  [QUESTION_MESSAGES.QUESTION_DELETE_FAILED]: "Question delete failed.",
  [QUESTION_MESSAGES.QUESTION_DELETE_SUCCESS]: "Question deleted successfully.",
  [QUESTION_MESSAGES.QUESTION_UPDATE_SUCCESS]: "Question updated successfully.",
  [QUESTION_MESSAGES.QUESTION_UPDATE_FAILED]: "Question update failed.",
  [QUESTION_MESSAGES.QUESTION_NOT_FOUND]: "Question not found.",
  [QUESTION_MESSAGES.QUESTION_FETCH_SUCCESS]: "Question fetched successfully.",
  [QUESTION_MESSAGES.QUESTION_FETCH_FAILED]: "Question fetch failed.",
  [QUESTION_MESSAGES.QUESTION_CREATE_SUCCESS]: "Question created successfully.",
  [QUESTION_MESSAGES.QUESTION_CREATE_FAILED]: "Question creation failed.",
  [QUESTION_MESSAGES.QUESTION_USED_BY_CONTEST]:
    "Question is used by contest. Cannot be deleted.",
};

const contestMessages = {
  [CONTEST_MESSAGES.CONTEST_NOT_FOUND]: "Contest not found.",
  [CONTEST_MESSAGES.CONTEST_CREATION_SUCCESS]: "Contest created successfully.",
  [CONTEST_MESSAGES.CONTEST_CREATION_FAILED]: "Failed to create contest.",
  [CONTEST_MESSAGES.CONTEST_FETCH_SUCCESS]: "Contest fetched successfully.",
  [CONTEST_MESSAGES.CONTEST_FETCH_FAILED]: "Failed to fetch contest.",
  [CONTEST_MESSAGES.CONTEST_UPDATE_SUCCESS]: "Contest updated successfully.",
  [CONTEST_MESSAGES.CONTEST_UPDATE_FAILED]: "Failed to update contest.",
  [CONTEST_MESSAGES.CONTEST_DELETE_SUCCESS]: "Contest deleted successfully.",
  [CONTEST_MESSAGES.CONTEST_DELETE_FAILED]: "Failed to delete contest.",
  [CONTEST_MESSAGES.CONTEST_ID_REQUIRED]: "Contest ID is required.",
  [CONTEST_MESSAGES.CONTEST_NAME_TOO_SMALL]: "Contest name is too short.",
  [CONTEST_MESSAGES.CONTEST_NAME_TOO_LARGE]: "Contest name is too long.",
  [CONTEST_MESSAGES.CONTEST_DESCRIPTION_TOO_SMALL]:
    "Contest description is too short.",
  [CONTEST_MESSAGES.CONTEST_DESCRIPTION_TOO_LARGE]:
    "Contest description is too long.",
  [CONTEST_MESSAGES.CONTEST_START_DATE_INVALID]:
    "Invalid start date for contest.",
  [CONTEST_MESSAGES.CONTEST_END_DATE_INVALID]: "Invalid end date for contest.",
  [CONTEST_MESSAGES.CONTEST_STARTDATE_CAN_NOT_BE_AFTER_ENDDATE]:
    "Start date cannot be after end date.",
  [CONTEST_MESSAGES.START_DATE_REQUIRED]: "Start date is required.",
  [CONTEST_MESSAGES.END_DATE_REQUIRED]: "End date is required.",
  [CONTEST_MESSAGES.ROLE_REQUIRED]: "User role is required.",
  [CONTEST_MESSAGES.INVALID_ROLE]: "Invalid role provided.",
  [CONTEST_MESSAGES.CONTEST_ALREADY_ENDED]: "This contest has already ended.",
  [CONTEST_MESSAGES.CONTEST_ALREADY_STARTED]:
    "This contest has already started.",
};

const prizesMessages = {
  [PRIZE_MESSAGES.PRIZE_NOT_FOUND]: "Prize not found.",
  [PRIZE_MESSAGES.PRIZE_CREATION_SUCCESS]: "Prize created successfully.",
  [PRIZE_MESSAGES.PRIZE_CREATION_FAILED]: "Failed to create prize.",
  [PRIZE_MESSAGES.PRIZE_FETCH_SUCCESS]: "Prize fetched successfully.",
  [PRIZE_MESSAGES.PRIZE_FETCH_FAILED]: "Failed to fetch prize.",
  [PRIZE_MESSAGES.PRIZE_UPDATE_SUCCESS]: "Prize updated successfully.",
  [PRIZE_MESSAGES.PRIZE_UPDATE_FAILED]: "Failed to update prize.",
  [PRIZE_MESSAGES.PRIZE_DELETE_SUCCESS]: "Prize deleted successfully.",
  [PRIZE_MESSAGES.PRIZE_DELETE_FAILED]: "Failed to delete prize.",
  [PRIZE_MESSAGES.PRIZE_ID_REQUIRED]: "Prize ID is required.",
};

const submissionMessages = {
  [SUBMISSION_MESSAGES.SUBMISSION_NOT_FOUND]: "Submission not found.",
  [SUBMISSION_MESSAGES.SUBMISSION_CREATION_SUCCESS]:
    "Submission created successfully.",
  [SUBMISSION_MESSAGES.SUBMISSION_CREATION_FAILED]:
    "Failed to create submission.",
  [SUBMISSION_MESSAGES.SUBMISSION_FETCH_SUCCESS]:
    "Submission fetched successfully.",
  [SUBMISSION_MESSAGES.SUBMISSION_FETCH_FAILED]: "Failed to fetch submission.",
  [SUBMISSION_MESSAGES.SUBMISSION_UPDATE_SUCCESS]:
    "Submission updated successfully.",
  [SUBMISSION_MESSAGES.SUBMISSION_UPDATE_FAILED]:
    "Failed to update submission.",
  [SUBMISSION_MESSAGES.SUBMISSION_DELETE_SUCCESS]:
    "Submission deleted successfully.",
  [SUBMISSION_MESSAGES.SUBMISSION_DELETE_FAILED]:
    "Failed to delete submission.",
  [SUBMISSION_MESSAGES.SUBMISSION_ID_REQUIRED]: "Submission ID is required.",
  [SUBMISSION_MESSAGES.SUBMISSION_EXISTS]: "Submission already exists.",
};

export const englishMessage = {
  ...commonMessages,
  ...userMessages,
  ...questionMessages,
  ...contestMessages,
  ...prizesMessages,
  ...submissionMessages,
};
