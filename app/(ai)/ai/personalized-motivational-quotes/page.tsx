"use client";
import React, { useEffect, useState,useRef } from "react";
import AiCard, { AiButton } from "../_components/AiCard";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { streamOutput } from "@/helpers/streamHelpers";
import { useEditorRef } from "@/hooks/useEditorRef";
import { PersonalizedMotivationalQuote } from "@/actions/ai";
import { Textarea } from "@/components/ui/textarea";

const page = () => {
  const [theme, setTheme] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const editorRef = useEditorRef();
  const onClick = async () => {
    if (theme.length < 0) {
      toast.error("Please enter a theme");
      return;
    }
    if (buttonRef.current) {
      buttonRef.current.setAttribute("disabled", "true");
    }
    toast.success("Generating personalized quotes...", {
      description: "This may take a few seconds",
      className: "bg-zinc-800 text-white",
      action: {
        label: "-50 Tokens",
        onClick: () => toast.dismiss(),
      },
    });
    streamOutput(PersonalizedMotivationalQuote, editorRef, theme);
        setTimeout(() => {
          if (buttonRef.current) {
            buttonRef.current.disabled = false;
          }
        }, 5000);
  };
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute("disabled", "true");
    }
    if (theme.trim().length > 0) {
      if (buttonRef.current) {
        buttonRef.current.removeAttribute("disabled");
      }
    }
  }, [theme]);

  return (
    <>
      <AiCard
        title="Personalized Quotes"
        description="Get personalized motivational quotes to keep you going using AI."
      >
        <div>
          <div className="my-2">
            <h2 className="text-xl font-bold">Describe your theme</h2>
            <Textarea
              className="border border-zinc-700 text-xs mt-2"
              placeholder="success, perseverance, creativity"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
        
            ></Textarea>
          </div>
          <div className="my-2">
            <AiButton onClick={onClick} ref={buttonRef} className="disabled:cursor-not-allowed">
              Generate Quotes
            </AiButton>
          </div>
        </div>
      </AiCard>
    </>
  );
};

export default page;
