"use client";
import React, { useState, useTransition } from "react";
import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { UsernameSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUsername } from "@/actions/user";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const CreateUsername = () => {
  const { data } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = new URLSearchParams(window.location.search);
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof UsernameSchema>>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: data?.user.username || "",
    },
  });

  const onSubmit = (values: z.infer<typeof UsernameSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createUsername(values.username).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
      redirect(callbackUrl!);
    });
  };

  return (
    <CardWrapper
      headerLabel="Please provide your username"
      backButtonLabel="Go to dashboard"
      backButtonHref="/"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="xyz123"
                      type="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default CreateUsername;
