import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { roleList } from "@/constant/common";
import { USER_ROLE } from "@/constant/enums";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

type ChangeRoleModalProps = React.FC<{
  currentRole: USER_ROLE;
  userId: string;
  onUpdateSuccess: (updatedRole: USER_ROLE) => void;
}>;

const ChangeRoleModal: ChangeRoleModalProps = ({
  currentRole,
  userId,
  onUpdateSuccess = () => {},
}) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpdate = async () => {
    const handleError = () => {
      toast.error("Something went wrong! Please try again.");
      setIsUpdating(false);
    };

    try {
      setIsUpdating(true);

      if (selectedRole === currentRole) {
        toast.error("No changes made!");
        setIsUpdating(false);
        return;
      }

      const { data: respData } = await axiosInstance.put("user/update-role", {
        _id: userId,
        role: selectedRole,
      });

      if (respData.success) {
        onUpdateSuccess(selectedRole);
        toast.success("Role updated successfully!");
        setIsUpdating(false);
        setOpen(false);
      } else {
        handleError();
      }
    } catch (error) {
      console.log("error", error);
      handleError();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isUpdating && setOpen(val)}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Role</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Change Role
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Choose a new role for this user.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          {roleList.map((m) => {
            const selected = selectedRole === m.value;
            return (
              <Card
                key={m.id}
                onClick={() => !isUpdating && setSelectedRole(m.value)}
                className={`relative flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-all ${
                  selected
                    ? "border-primary bg-primary/10 shadow-sm"
                    : "border-border hover:bg-muted/50"
                } ${isUpdating ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                <div className="flex flex-row items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      selected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {m.name}
                  </span>
                  {selected && (
                    <CheckCircle2 className="w-5 h-5 text-primary transition-transform" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <DialogFooter className="mt-6 flex justify-between sm:justify-end">
          <DialogClose asChild disabled={isUpdating}>
            <Button type="button" variant="ghost" disabled={isUpdating}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="font-medium"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-muted-foreground" />
            )}
            {isUpdating ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ChangeRoleModal };
