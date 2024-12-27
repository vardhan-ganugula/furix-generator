"use client";
import React, { useState, useRef } from "react";
import { Frame } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BrandCaseStudy } from "@/actions/ai";
import { useEditorRef } from "@/hooks/useEditorRef";
import { streamOutput } from "@/helpers/streamHelpers";
import AiCard,{AiButton} from "../_components/AiCard";

// Removed dynamic import for pdfDownloader

function Page() {
  const [brandName, setBrandname] = useState<string>("");
  const [strategy, setStrategy] = useState<string>("");
  const editorRef = useEditorRef();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleGenerateCaseStudy = () => {
    if (!brandName || !strategy) {
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
    streamOutput(BrandCaseStudy, editorRef, brandName, strategy);
    setTimeout(() => {
      if (btnRef.current) {
        btnRef.current.disabled = false;
      }
    }, 5000);
  };

  return (
    <>
      <AiCard
        title="Brand Case Study"
        description="Create a concise case study detailing how a brand effectively used a
          specific strategy to overcome challenges and achieve measurable
          results. Include an overview, strategy implementation, goals,
          audience, tactics, timeline, and results, supported by data,
          concluding with actionable insights for marketers."
      >
        <div>
          <h2 className="md:text-2xl text-sm font-bold">Brand Name</h2>
          <div className="my-2">
            <Input
              className="border-2 border-zinc-700 text-xs md:text-md"
              type="text"
              placeholder="Starbucks "
              value={brandName}
              onChange={(e) => setBrandname(e.target.value)}
            />
          </div>
        </div>
        <Separator />
        <div>
          <h2 className="md:text-2xl text-sm font-bold">Strategy</h2>
          <div className="my-2">
            <Textarea
              className="border border-zinc-700 text-xs md:text-md"
              placeholder="Personalized Marketing with Rewards Program"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
            ></Textarea>
          </div>
        </div>
        <AiButton
          onClick={handleGenerateCaseStudy}
          ref={btnRef}
        >
          Generate Case Study
        </AiButton>
      </AiCard>
    </>
  );
}

export default Page;
