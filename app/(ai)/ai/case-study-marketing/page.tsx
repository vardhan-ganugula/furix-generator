"use client";
import React from "react";
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

// Removed dynamic import for pdfDownloader

function page() {
  const [brandName, setBrandname] = React.useState<string>("");
  const [strategy, setStrategy] = React.useState<string>("");
  const editorRef = useEditorRef();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  
  const handleGenerateCaseStudy = () => {
    if (!brandName || !strategy) {
      toast("Please fill in the required fields");
      return;
    }
    
    if (btnRef.current) {
      
      btnRef.current.disabled = true;
    }

    toast("Generating case study...", 
      {
        description : "This may take a few seconds",
        className: "bg-zinc-800 text-white",
        action: 
          {
            label: "-50 Tokens",
            onClick: () => toast.dismiss(),
          },
        
      }
    );
    streamOutput(BrandCaseStudy, editorRef, brandName, strategy);
    setTimeout(() => {
      if (btnRef.current) {
        btnRef.current.disabled = false;
      }
    }, 5000);
  };


  
  return (
    <Card className="bg-zinc-800">
      <CardHeader>
        <CardTitle className="text-4xl flex items-center gap-4">
          <Frame />
          Brand Case Study
        </CardTitle>
        <CardDescription>
          Create a concise case study detailing how a brand effectively used a
          specific strategy to overcome challenges and achieve measurable
          results. Include an overview, strategy implementation, goals,
          audience, tactics, timeline, and results, supported by data,
          concluding with actionable insights for marketers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h2 className="text-2xl font-bold">Brand Name</h2>
          <div className="my-2">
            <Input
              className="border-2 border-zinc-700"
              type="text"
              placeholder="Starbucks"
              value={brandName}
              onChange={(e) => setBrandname(e.target.value)}
            />
          </div>
        </div>
        <Separator />
        <div>
          <h2 className="text-2xl font-bold">Strategy</h2>
          <div className="my-2">
            <Textarea
              className="border border-zinc-700"
              placeholder="Personalized Marketing with Rewards Program"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
            ></Textarea>
          </div>
        </div>
        <Button className="mt-4 disabled:cursor-not-allowed" onClick={handleGenerateCaseStudy} ref={btnRef}>
          Generate Case Study
        </Button>

      </CardContent>
    </Card>
  );
}

export default page;
