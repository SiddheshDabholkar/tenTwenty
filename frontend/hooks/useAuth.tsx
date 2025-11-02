/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useUser } from "./useUser";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  validateLoginPayload,
  validateRegisterPayload,
} from "@/lib/validation";
import { handleTranslate } from "@/lib/translate";
import { Maybe, TranslateKey } from "@/types/common";
import { getErrorMessage } from "@/lib/common";

type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

const useAuth = () => {
  const { storeUser } = useUser();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleRegister = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterPayload) => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsRegistering(false);
    };
    try {
      const validationError = validateRegisterPayload({
        email,
        password,
        firstName,
        lastName,
      });
      if (validationError) {
        toast.error(handleTranslate(validationError));
        return;
      }

      const { data: respData } = await axiosInstance.post("auth/register", {
        email,
        password,
        firstName,
        lastName,
      });
      if (respData.success) {
        storeUser(respData.data);
        toast.success("Registered successfully!");
        setIsRegistering(false);
        router.push("/dashboard");
      } else {
        handleError(respData.message);
      }
    } catch (error) {
      handleError(null);
    }
  };

  const handleLogin = async ({ email, password }: LoginPayload) => {
    const handleError = (msg: Maybe<TranslateKey>) => {
      toast.error(getErrorMessage(msg));
      setIsLoggingIn(false);
    };
    try {
      const validationError = validateLoginPayload({
        email,
        password,
      });
      if (validationError) {
        toast.error(validationError);
        return;
      }
      const { data: respData } = await axiosInstance.post("auth/login", {
        email,
        password,
      });
      if (respData.success) {
        storeUser(respData.data);
        toast.success("Loggedin successfully!");
        setIsLoggingIn(false);
        router.push("/dashboard");
      } else {
        handleError(respData.message);
      }
    } catch (error) {
      handleError(null);
    }
  };

  return {
    isLoggingIn,
    isRegistering,
    handleRegister,
    handleLogin,
  };
};

export default useAuth;
