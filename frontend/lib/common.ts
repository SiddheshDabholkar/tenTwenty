import { UserType } from "@/types/schemas";

const getUserFullName = (user: UserType) => {
  return `${user.firstName} ${user.lastName}`;
};

export { getUserFullName };
