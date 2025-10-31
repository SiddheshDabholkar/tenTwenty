"use client";

import { LOCAL_KEYS } from "@/constant/enums";
import { Maybe } from "@/types/common";
import { UserType } from "@/types/schemas";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type UserContextProps = {
  user: Maybe<UserType>;
  storeUser: (user: UserType) => void;
  removeUser: () => void;
  isFetching: boolean;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<Maybe<UserType>>(null);

  const storeUser = (data: UserType) => {
    localStorage.setItem(LOCAL_KEYS.USER_DATA, JSON.stringify(data));
    setUser(data);
  };

  const removeUser = () => {
    setUser(null);
    router.replace("/");
    localStorage.clear();
  };

  useEffect(() => {
    const localData = localStorage.getItem(LOCAL_KEYS.USER_DATA);
    const parsedData = localData ? JSON.parse(localData) : null;
    setUser(parsedData);
    setIsFetching(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, storeUser, removeUser, isFetching }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
