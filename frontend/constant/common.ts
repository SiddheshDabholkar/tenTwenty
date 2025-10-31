import { USER_ROLE } from "./enums";

const roleList = [
  {
    id: 1,
    name: "Admin",
    value: USER_ROLE.ADMIN,
  },
  {
    id: 2,
    name: "VIP",
    value: USER_ROLE.VIP,
  },
  {
    id: 3,
    name: "Normal",
    value: USER_ROLE.NORMAL,
  },
];

export { roleList };
