"use client";
import React from "react";
import { AiButton } from "../_components/AiCard";
import csvLoader from "@/helpers/csvLoader";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { SocialMediaCalendar } from "@/actions/ai";
import { useEditorRef } from "@/hooks/useEditorRef";
import { streamOutput } from "@/helpers/streamHelpers";
import AiCard from "../_components/AiCard";
import markdownParser from "@/helpers/markdownParser";

function Page() {
  const [niche, setNiche] = React.useState<string>("");
  const editorRef = useEditorRef();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const handleGenerateCaseStudy = () => {
    if (!niche) {
      toast("Please fill in the required fields");
      return;
    }

    if (btnRef.current) {
      btnRef.current.disabled = true;
    }

    toast("Generating case study...", {
      description: "This may take a few seconds",
      className: "bg-zinc-800 text-white",
      action: {
        label: "-50 Tokens",
        onClick: () => toast.dismiss(),
      },
    });
    streamOutput(SocialMediaCalendar, editorRef, niche);
    setTimeout(() => {
      if (btnRef.current) {
        btnRef.current.disabled = false;
      }
    }, 5000);
  };
  return (
    <AiCard
      title="Socai Media Calendar"
      description="Generate a 7-day social media content calendar for a specific niche, detailing daily posts tailored to Instagram, Facebook, and Twitter. Include dates, platforms, times, post types, captions, hashtags, media, and varied content to enhance brand visibility, engagement, and follower growth."
    >
      <div>
        <h2 className="text-2xl font-bold">Describe your niche</h2>
        <div className="my-2">
          <Textarea
            className="border border-zinc-700"
            placeholder="Eco-friendly Products"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          ></Textarea>
        </div>
      </div>
      <div className="flex gap-5 items-center">

      <AiButton onClick={handleGenerateCaseStudy} ref={btnRef}>
        {niche ? "Generate Calendar" : "Fill in the required fields"}
      </AiButton>
      <Button
      className="mt-4"
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
