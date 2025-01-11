"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/schema/user";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const ResetPassword = () => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const params = useSearchParams();
  const token = params.get("token") || "";
  const router = useRouter();

  const handleResetPassword = async (
    data: z.infer<typeof resetPasswordSchema>
  ) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    try {
      const res = await axios.post("/api/v1/reset-password", {
        password,
        token,
      });
      if (res.data.status === "success") {
        toast.success("Password reset successfully");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        (error as AxiosError<{ message: string }>)?.response?.data?.message ??
          "An error occurred"
      );
    }
  };
  useEffect(() => {
    if (!params.has("token")) {
      toast.error("Invalid reset password link");
    }
  }, [params, token]);
  return (
    <Card className="w-96 rounded-none shadow">
      <CardHeader className="bg-black text-white text-center text-xl">
        <CardTitle>Forgot Password</CardTitle>
      </CardHeader>
      <CardContent className="py-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleResetPassword)}
            className="space-y-5"
          >
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your password"
                      className="rounded-none py-5"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="retype your password"
                      className="rounded-none py-5"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-black text-white text-sm rounded-none hover:bg-zinc-800 py-5 mt-5 w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <span className="mr-2 animate-spin">
                    <Loader2 size={20} />
                  </span>
                  <span>Updating...</span>
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-left pl-2 ml-0 flex flex-col items-start gap-y-2">
          <p className="text-center text-sm">
            Remember your password?{" "}
            <Link href="/login" className="text-emerald-600">
              Login
            </Link>
          </p>
          <p className="text-center text-sm">
            Resend verification main ?{" "}
            <Link href="/forgot-password" className="text-emerald-600">
              here
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResetPassword;
