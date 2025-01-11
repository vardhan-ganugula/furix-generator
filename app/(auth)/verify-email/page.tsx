"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const VerifyEmailPage = () => {
  const params = useSearchParams();
  const [response, setResponse] = React.useState<{
    status: string;
    message: string;
  }>({
    status: "loading",
    message: "",
  });
  const token = params.get("token");
  useEffect(() => {
    axios
      .post("/api/v1/verify-email", { token })
      .then((res) => {
        const { data } = res;
        if(data.status){
            setResponse({...data});
        }
      })
      .catch((err) => {
        console.log(err);
        setResponse({ status: "error", message: (err as AxiosError<{message:string}>)?.response?.data.message || "Unable to verify email" });
      });
  }, [token]);
  return (
    <Card className="w-80 md:w-96 rounded-none shadow-lg font-poppins ">
      <CardHeader className="bg-black text-center text-white">
        <CardTitle className="text-2xl">Verify Email</CardTitle>
      </CardHeader>
      <CardContent className="py-5 space-y-5">
        <div className={`shadow py-5 space-x-2 ${token ? 'text-center' : 'pl-5'}`}>
          <span className="font-bold text-md">Token</span> :
          <span className="text-sm">{token}</span>
        </div>
        <div>
          {response.status === "loading" ? (
            <Skeleton className="w-full h-20" />
          ) : response.status === "success" ? (
            <div className="text-green-500 w-full h-20 bg-green-100 grid place-content-center">{response.message}</div>
          ) : (
            <div className="text-red-500 w-full h-20 bg-red-100 grid place-content-center">{response.message}</div>

          )}
        </div>
      </CardContent>
      <CardFooter className="bg-black p-5 text-white text-center space-x-2 text-sm">
        <span>Resend Email Verification Link</span> <Link href="/send-verification-email" className="text-blue-400"> here</Link>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmailPage;
