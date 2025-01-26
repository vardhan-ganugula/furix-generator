"use client";
import React, { useRef } from "react";
import AiCard, { AiButton } from "../_components/AiCard";
import { useEditorRef } from "@/hooks/useEditorRef";
import { toast } from "sonner";

const GenerateCreativeStory = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const editorRef = useEditorRef();
  const handleOnClick = async () => {
    try {
      const response = await fetch("/api/ai/creative-story-generation", {
        method: "POST",
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

  };



  return (
    <AiCard
      title="Generate Creative Story"
      description="Use our advanced AI to craft unique and engaging stories that capture the essence of current trends. Whether you're looking for inspiration or need a complete narrative, our AI-powered tool can help you create compelling content effortlessly. Simply provide a few keywords or a brief outline, and let our AI do the rest. Perfect for writers, marketers, and anyone in need of creative content."
    >
      <AiButton ref={buttonRef} onClick={handleOnClick}>
        Generate Story
      </AiButton>
    </AiCard>
  );
};

export default GenerateCreativeStory;
