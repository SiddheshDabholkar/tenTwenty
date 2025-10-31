import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type AuthLayoutProps = React.FC<{
  children: React.ReactNode;
}>;

const AuthLayout: AuthLayoutProps = ({ children }) => {
  const router = useRouter();
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="relative hidden bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-muted md:block  overflow-hidden" />
      <div className="flex items-center justify-center px-8 bg-card text-primary">
        <div className="mx-auto w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
