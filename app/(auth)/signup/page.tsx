"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignupPage = () => {
  const formSchema = z.object({
    username: z
      .string()
      .min(5, { message: "username must be at least 5 characters long" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*#?&]{8,}$/,
        { message: "Use a strong Password" }
      ),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <section className='font-poppins flex flex-col items-center justify-center h-[91vh] md:h-[89.45vh] w-full inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] md:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]'>
      <div >
        <Card className='w-[350px] bg-white rounded-none p-0'>
          <CardHeader className='p-0 '>
            <CardTitle className='text-3xl bg-black text-white py-5 text-center'>Register</CardTitle>
            <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 py-3"
                autoComplete="off"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="first name" {...field} className="rounded-none py-5"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField 
                  control={form.control}
                  name="email"
                  render = { ({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} className="rounded-none py-5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="password" {...field} className="rounded-none py-5" type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <p className="py-2 text-xs">already have an account? login <Link href='/login' className="underline text-blue-600 decoration-blue-500 underline-offset-4 ">here</Link></p>
                  <Button type="submit" className="w-full rounded-none py-5  flex items-center bg-black hover:bg-zinc-800"> Sign Up </Button>
              </form>
            </Form>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default SignupPage;
