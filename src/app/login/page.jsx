"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";

const LogInPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = Object.fromEntries(formData.entries());
    console.log(result);
    const { data, error } = await authClient.signIn.email({
      email: result.email,
      password: result.password,
    });
    console.log(data, error);
    if (data) {
      toast.success("You are successfully Logged in");
      redirect("/");
    }
    if (error) {
      toast.error("Please Enter Your Valid Information");
    }
  };

  const handelSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold my-5 text-center">
        Login your account
      </h1>
      <h5 className="text-center mb-3 text-teal-900">
        Start your Adventure with Wanderlust
      </h5>
      <Card className="p-5 border ">
        <Form
          onSubmit={onSubmit}
          className="flex w-96 flex-col gap-4 space-y-5"
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="">
            <Button className="w-full bg-teal-500 " type="submit">
              Login
            </Button>
          </div>
        </Form>
        <div className="flex justify-center items-center gap-3 ">
          <Separator className="flex-1"></Separator>
          <div className="whitespace-nowrap">Or sign up with</div>
          <Separator className="flex-1"></Separator>
        </div>
        <div>
          <Button onClick={handelSignIn} variant="outline" className="w-full">
            <FcGoogle /> Sign Up With Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LogInPage;
