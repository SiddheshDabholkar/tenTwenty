import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getUserFullName } from "@/lib/common";
import { UserType } from "@/types/schemas";
import { Trophy, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ChangeRoleModal } from "./ChangeRoleModal";
import { MaybeArray } from "@/types/common";

type UserCardProps = React.FC<{
  data: UserType;
  setData: React.Dispatch<React.SetStateAction<MaybeArray<UserType>>>;
}>;
const UserCard: UserCardProps = ({ data, setData }) => {
  return (
    <Card className="w-full flex flex-row items-center p-4 gap-4 shadow-none">
      <span className="bg-blue-100 p-3 h-12 w-12 rounded-full">
        <User />
      </span>
      <div className="flex flex-row items-center justify-between w-full">
        <div>
          <CardTitle className="mb-2">{getUserFullName(data)}</CardTitle>
          <CardDescription>{data.role}</CardDescription>
        </div>
        <ChangeRoleModal
          onUpdateSuccess={(role) => {
            setData((prev) =>
              prev.map((item) =>
                item._id === data._id ? { ...item, role } : item
              )
            );
          }}
          userId={data._id}
          currentRole={data.role}
        />
      </div>
    </Card>
  );
};

export default UserCard;
