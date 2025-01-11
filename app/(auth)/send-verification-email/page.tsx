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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const VerifyPage = () => {
  const emailSchema = z.object({
    email: z.string().email(),
  });
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleEmailReponse = async( data: z.infer<typeof emailSchema>) => {
    try {
      const response = await axios.post("/api/v1/send-verification-email", data);
      if(response.data.status === "success"){
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      toast.error(errorMessage);
    }
  }
  return (
    <Card className="shadow w-80 rounded-none ">
      <CardHeader className="bg-black text-white text-center">
        <CardTitle>Send Verification Email</CardTitle>
      </CardHeader>
      <CardContent className="py-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEmailReponse)}>
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your email" className="rounded-none py-5"  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-5 rounded-none py-5 ">
              Send Email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VerifyPage;
