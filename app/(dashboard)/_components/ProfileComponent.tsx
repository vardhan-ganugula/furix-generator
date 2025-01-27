"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userInfoSchema } from "@/lib/schema/user";
import React, { useEffect, memo } from "react";
import axios from "axios";
import { UserProfileDetails } from "@/types/customTypes";
import { useFurix } from "@/hooks/furixContext";
import { toast } from "sonner";
import Image from "next/image";



const ProfileComponent = () => {
  const { setCoins } = useFurix();

  const [userInfo, setUserInfo] = React.useState<UserProfileDetails>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    role: "",
    isVerified: false,
    token: 0,
    avatar: "https://thumbs.dreamstime.com/b/studio-photo-african-american-female-model-face-profile-closeup-fashionable-portrait-metis-young-woman-perfect-smooth-153607290.jpg",
  });

  const infoForm = useForm<z.infer<typeof userInfoSchema>>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const handleProfileUpdate = (data: z.infer<typeof userInfoSchema>) => {
    axios
      .post("/api/v1/profile", data)
      .then((res) => {
        if(res.data.status === "success"){
          toast.success("Profile updated successfully")
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to update the profile");
      });
  };


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/v1/profile");
        const fetchedData = res.data.data;
  
        const updatedUserInfo = {
          ...userInfo,
          ...fetchedData,
        };
  
        setUserInfo(updatedUserInfo);
        setCoins(fetchedData.token); 
        infoForm.reset(updatedUserInfo); 
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };
  
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserInfo, setCoins, infoForm]);
  

  return (
    <div className="border-2 border-emerald-600 p-5 rounded-xl">
      <h1 className="text-2xl font-bold">Personal Information</h1>
      <div className="flex p-5 gap-5 flex-col">
        <div className="justify-between flex flex-col gap-5 md:flex-row md:gap-10">
          <div className="flex items-center gap-5">
            <Image
              src={userInfo.avatar}
              alt="profile"
              className="rounded-full object-cover w-[100px] h-[100px]"
              width={100}
              height={100}
            />
            <div>
              <h4 className="text-xl font-bold">Profile Picture</h4>
              <p className="text-sm font-light"> PNG, JPG, Image files only </p>
            </div>
          </div>
          <div className="w-2/7 flex-shrink flex-grow-0">
            <form className="space-x-3 text-xs">
              <input
                type="file"
                accept="image/*"
                id="profile-file"
                className=""
                hidden
              />
              <label
                htmlFor="profile-file"
                className="cursor-pointer bg-white rounded-full py-2  px-4 text-black"
              >
                choose image
              </label>
              <button className="bg-emerald-600 text-white px-5 py-2 rounded-full">
                upload
              </button>
            </form>
          </div>
        </div>
        <div>
          <Form {...infoForm}>
            <form
              onSubmit={infoForm.handleSubmit(handleProfileUpdate)}
              className="md:grid space-y-5 md:space-y-0 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-rows-7 md:grid-rows-4 lg:grid-rows-3 gap-x-5 gap-y-3 md:px-10"
            >
              <FormField
                control={infoForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="First Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={infoForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Last Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={infoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={infoForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={infoForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Current Password"
                      />
                    </FormControl>
                    <FormMessage />

                  </FormItem>
                )}
              />
              <FormField
                control={infoForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="New Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="col-start-2 my-3">
                Save
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default memo(ProfileComponent);
