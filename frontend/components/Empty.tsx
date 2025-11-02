import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type EmptyProps = React.FC<{
  title: string;
  description: string;
  small?: boolean;
}>;
const Empty: EmptyProps = ({ title, description, small = false }) => {
  const imagesStyle = small ? "h-[125px] w-[130px]" : "h-[250px] w-[260px]";
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        small ? "h-[40vh]" : "h-[70vh]"
      )}
    >
      <div className={cn("relative", imagesStyle)}>
        <Image alt="Empty image" src="/empty.svg" fill />
      </div>
      <h2
        className={cn(
          "text-center font-bold mt-8",
          small ? "text-[0.95rem]" : "text-2xl"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          " text-center text-muted-foreground",
          small ? "text-[0.75rem]" : "text-lg"
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default Empty;
