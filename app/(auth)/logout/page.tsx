"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LogoutPage = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string>("");
  const [time, setTime] = React.useState<number>(5);
  useEffect(() => {
    axios
      .get("/api/v1/logout")
      .then((res) => {
        if (res.data.status !== "success") {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    const timeout = setTimeout(() => {
      router.push("/login");
    }, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <Card className="w-[400px] mx-auto mt-20">
      <CardHeader>
        <CardTitle>
          Logout
        </CardTitle>
      </CardHeader>
      <CardContent>
      <div className="space-y-3 text-center">
        <p className="text-sm font-light text-green-500">
          You have been logged out successfully
        </p>
        <p className="text-sm font-light">redirecting in {time}</p>
        <p className="text-sm font-light text-red-500"> {error && error}</p>
      </div>
      </CardContent>
      </Card>
  );
};

export default LogoutPage;
