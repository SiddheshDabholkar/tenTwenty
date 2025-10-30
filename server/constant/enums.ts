enum SCHEMAS {
  CONTEST = "Contest",
  PRIZE = "Prize",
  QUESTION = "Question",
  SUBMISSION = "Submission",
  USER = "User",
  ANSWER_OPTION = "AnswerOption",
  WON_BY = "WonBy",
}

enum QUESTIONS_TYPES {
  RADIO = "Radio",
  CHECKBOX = "Checkbox",
  SWITCH = "Switch",
}

enum USER_ROLE {
  ADMIN = "admin",
  VIP = "vip",
  NORMAL = "normal",
}

export { SCHEMAS, QUESTIONS_TYPES, USER_ROLE };
