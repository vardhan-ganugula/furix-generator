"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { emailSchema } from "@/lib/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ForgotPasswordPage = () => {
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleResetPassword = async (data: z.infer<typeof emailSchema>) => {
    try {
      const response = await axios.post("/api/v1/forgot-password", data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  };
  return (
    <Card className="w-96 rounded-none shadow">
      <CardHeader className="bg-black text-white text-center text-xl">
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>
      <CardContent className="py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleResetPassword)}>
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className="rounded-none py-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-black text-white text-sm rounded-none hover:bg-zinc-800 py-5 mt-5 w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <span className="mr-2 animate-spin">
                    <Loader2 size={20} />
                  </span>
                  <span>Sending...</span>
                </>
              ) : (
                "Send Email"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordPage;
