"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useEditorRef } from "./useEditorRef";

const useStreamApi = ({
    buttonRef,
    apiObject: {
        endPoint,
        data
    }
}: {
    buttonRef: React.RefObject<HTMLButtonElement>;
    apiObject: {
        endPoint: string;
        data?: {
            [key: string]: string
        };   
    }
}) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const editorRef = useEditorRef();
  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(endPoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
      let text = "";
      if (!response.ok) {
        console.log(response);
        if (response.status === 402) {
          toast.error("Insufficient token balance");
          return;
        }
        if (response.status === 404) {
          toast.error("User not found");
          return;
        }
        if (response.status === 401) {
          toast.error("Unauthorized");
          return;
        }
        throw new Error("Network response was not ok");
      }
      toast.success("generating response", {
        description: "This may take a few seconds",
        className: "bg-zinc-800 text-white",
        action: {
          label: "-50 Tokens",
          onClick: () => toast.dismiss(),
        },
      });
      if (buttonRef.current) {
        buttonRef.current.disabled = true;
      }
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader?.read()!;
        done = readerDone;
        const chunk = decoder.decode(value);
        text += chunk;
        editorRef.current?.setContent(text);
      }
      if (buttonRef.current) {
        buttonRef.current.disabled = false;
      }
    } catch (error) {
      console.log(error);
      console.error("Error generating text:", error);
      toast.error("Error generating text " + error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return {
    handleGenerate,
    isLoading,

  };
};


export default useStreamApi;