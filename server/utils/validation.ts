import { USER_MESSAGES } from "../constant/message";

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

export { validateRegisterPayload, validateLoginPayload };
