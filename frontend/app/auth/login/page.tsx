/* eslint-disable react/no-unescaped-entities */
"use client";

import AuthLayout from "@/components/AuthLayout";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, isLoggingIn } = useAuth();

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <form>
          <FieldGroup>
            <FieldSet>
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-[2rem] mb-0">Login</h2>
                <p>Enter your details to login</p>
              </div>
              <FieldGroup className="gap-4">
                <Field className="gap-1">
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Email
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="Enter email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Password
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <div className="flex flex-col items-center">
              <Button
                onClick={() => {
                  handleLogin({
                    email,
                    password,
                  });
                }}
                type="button"
                className="w-full cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <Spinner />
                    Logging In...
                  </>
                ) : (
                  <>Login</>
                )}
              </Button>
              <Link className="text-[0.85rem] underline mt-2" href="/auth/signup">
                Don't have an account?
              </Link>
            </div>
          </FieldGroup>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
