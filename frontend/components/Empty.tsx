import Image from "next/image";
import React from "react";

type EmptyProps = React.FC<{
  title: string;
  description: string;
}>;
const Empty: EmptyProps = ({ title, description }) => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <div className="relative h-[250px] w-[260px]">
        <Image alt="Empty image" src="/empty.svg" fill />
      </div>
      <h2 className="text-2xl text-center font-bold mt-8">{title}</h2>
      <p className="text-lg text-center text-muted-foreground">{description}</p>
    </div>
  );
};

export default Empty;
