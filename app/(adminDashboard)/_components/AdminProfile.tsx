"use client";
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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import profileImage from "@/public/cat.webp";
import Image from "next/image";

const AdminProfile = () => {
  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const [file, setFile] = React.useState<File | null>(null);
  const userInfoSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email(),
    username: z.string().nonempty(),
    image: z
      .any()
      // To not allow empty files
      .refine((files) => files?.length >= 1, { message: "Image is required." })
      // To not allow files other than images
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      })
      // To not allow files larger than 5MB
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: `Max file size is 5MB.`,
      }),
  });
  const form = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
    },
  });
  return (
    <div className="bg-zinc-900 p-5">
      <div className="py-5 container">
        <h2>Profile</h2>
        <p className="mt-2 text-zinc-500">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator orientation="horizontal" className="bg-zinc-700" />
      <div>
        <Form {...form}>
          <form
            className="p-5 flex-col-reverse md:flex-row space-y-5 flex gap-5 justify-evenly items-center"
            onSubmit={form.handleSubmit((data) => console.log(data))}
          >
            <div className="md:w-[800px] w-full">
              <FormField
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>FirstName</FormLabel>
                      <FormControl>
                        <div className="space-y-1">
                          <Input
                            {...field}
                            type="text"
                            className="border-zinc-700 hover:border-zinc-500 focus:border-zinc-500"
                            placeholder="firstname"
                          />

                          <p className="text-zinc-500 text-sm pl-2">
                            your firstname is how others will see you on the
                            site.
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>LastName</FormLabel>
                      <FormControl>
                        <div className="space-y-1">
                          <Input
                            {...field}
                            type="text"
                            className="border-zinc-700 hover:border-zinc-500 focus:border-zinc-500"
                            placeholder="lastname"
                          />

                          <p className="text-zinc-500 text-sm pl-2">
                            your lastname is how others will see you on the
                            site.
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <div className="space-y-1">
                          <Input
                            {...field}
                            type="text"
                            className="border-zinc-700 hover:border-zinc-500 focus:border-zinc-500"
                            placeholder="username"
                          />

                          <p className="text-zinc-500 text-sm pl-2">
                            Your username is your unique identifier on our
                            platform. Make it memorable!
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="space-y-1">
                          <Input
                            {...field}
                            type="email"
                            className="border-zinc-700 hover:border-zinc-500 focus:border-zinc-500"
                            placeholder="user@example.com"
                          />
                          <p className="text-zinc-500 text-sm pl-2">
                            your email is used for login and notifications. We
                            will never share your email with anyone.
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button
                className="col-start-2 my-3 bg-white text-black hover:bg-gray-200"
                onSubmit={() => {
                  console.log(file);
                }}
              >
                Update Profile
              </Button>
            </div>
            <div className="space-y-5 p-2 rounded border border-zinc-700 border-dashed">
              <Image
                src={file ? URL.createObjectURL(file) : profileImage}
                alt="profile"
                className="object-cover "
                width={350}
                height={350}
              />
              <FormField
                name="image"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="bg-white block py-3 text-black text-center cursor-pointer">
                        Profile Picture
                      </FormLabel>
                      <FormControl>
                        <input
                          type="file"
                          hidden
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          onChange={(e) => {
                            if (e.target.files?.length) {
                              setFile(e.target.files[0]);
                              field.onChange(e.target.files);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminProfile;
