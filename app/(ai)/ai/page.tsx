"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AiPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("products");
  }, []);
  return <div>AiPage</div>;
}

export default AiPage;
