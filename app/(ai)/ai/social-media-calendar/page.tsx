"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiButton } from "../_components/AiCard";
import csvLoader from "@/helpers/csvLoader";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEditorRef } from "@/hooks/useEditorRef";
import AiCard from "../_components/AiCard";
import markdownParser from "@/helpers/markdownParser";
import useStreamApi from "@/hooks/useStreamApi";

function Page() {
  const [niche, setNiche] = useState<string>("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const editorRef = useEditorRef();
  const apiObject = {
    endPoint: "/api/ai/social-media-calendar",
    data: {
      niche,
    },
  };
  const { handleGenerate, isLoading } = useStreamApi({ buttonRef, apiObject });

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setAttribute("disabled", "true");
    }
    if (niche.trim().length > 0) {
      if (buttonRef.current) {
        buttonRef.current.removeAttribute("disabled");
      }
    }
  }, [niche]);
  
  return (
    <AiCard
      title="Socai Media Calendar"
      description="Generate a 7-day social media content calendar for a specific niche, detailing daily posts tailored to Instagram, Facebook, and Twitter. Include dates, platforms, times, post types, captions, hashtags, media, and varied content to enhance brand visibility, engagement, and follower growth."
    >
      <div>
        <h2 className="text-xl font-bold">Describe your niche</h2>
        <div className="my-2">
          <Textarea
            className="border border-zinc-700 text-xs"
            placeholder="Eco-friendly Products"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          ></Textarea>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <AiButton onClick={handleGenerate} ref={buttonRef} disabled={isLoading}>
          Generate Quotes
        </AiButton>
        <Button
          className="mt-4 text-xs"
          onClick={async () => {
            const html = await markdownParser(
              editorRef.current?.getContent()?.toString() || ""
            );
            const table = document.createElement("div");
            table.innerHTML = html;
            csvLoader(table);
          }}
        >
          Downlaod as CSV
        </Button>
      </div>
    </AiCard>
  );
}

export default Page;
