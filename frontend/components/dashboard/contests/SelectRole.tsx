import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { USER_ROLE } from "@/constant/enums";

const roles = [
  {
    id: 1,
    name: "VIP",
    value: USER_ROLE.VIP,
  },
  {
    id: 2,
    name: "Normal",
    value: USER_ROLE.NORMAL,
  },
];

type SelectRoleProps = React.FC<{
  selectedRole: USER_ROLE;
  onSelect: (role: USER_ROLE) => void;
}>;
const SelectRole: SelectRoleProps = ({ selectedRole, onSelect }) => {
  return (
    <Select value={selectedRole} onValueChange={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select role</SelectLabel>
          {roles.map((m) => (
            <SelectItem key={m.id} value={m.value}>
              {m.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectRole;
