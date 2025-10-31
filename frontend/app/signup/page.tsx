"use client";

import AuthLayout from "@/components/AuthLayout";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const SignupPage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {};

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <form>
          <FieldGroup>
            <FieldSet>
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-[2rem] mb-0">Signup</h2>
                <p>Enter your details to create your account</p>
              </div>
              <FieldGroup className="gap-4">
                <Field className="gap-1">
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    First Name
                  </FieldLabel>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="checkout-7j9-card-name-43j"
                    placeholder="Enter first name"
                    required
                  />
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Last Name
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="Enter last name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Email
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="Enter Email"
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
                onClick={handleSignup}
                type="button"
                className="w-full cursor-pointer"
              >
                {isSigningUp ? (
                  <>
                    <Spinner />
                    Creating...
                  </>
                ) : (
                  <>Create</>
                )}
              </Button>
              <Link className="text-[0.85rem] underline mt-2" href="/">
                Already have an account?
              </Link>
            </div>
          </FieldGroup>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
