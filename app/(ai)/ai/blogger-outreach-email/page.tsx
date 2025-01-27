'use client'
import React, { useEffect } from 'react'
import AiCard, { AiButton } from '../_components/AiCard';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import useStreamApi from '@/hooks/useStreamApi';
import { Textarea } from '@/components/ui/textarea';

const BloggerOutreachEmail = () => {
    const [niche, setNiche] = React.useState<string>("");
    const [userPrompt, setUserPrompt] = React.useState<string>("");
    const apiObject = {
      endPoint: "/api/ai/blogger-outreach-email",
      data: { niche, userPrompt },
    };
      const buttonRef = React.useRef<HTMLButtonElement>(null);
      const { handleGenerate, isLoading } = useStreamApi({ buttonRef, apiObject });
  
      useEffect(() => {
          if(niche.length === 0){
              buttonRef.current?.setAttribute("disabled", "true");
          }else{
              buttonRef.current?.removeAttribute("disabled");
          }
  
      }, [niche]);
    return (
      <>
        <AiCard
          title="Content Plan Monthly"
          description="This prompt requests a concise email outreach template for bloggers in a specific niche. The email should include a friendly greeting, blogger introduction, collaboration benefits, specific partnership ideas, and a call-to-action. The template must be professional, personalized, and include placeholders for easy customization, with an engaging subject line tailored to the collaboration offer.
           "
        >
          <div>
            <h2 className="md:text-2xl text-sm font-bold">Enter your niche</h2>
            <div className="my-2">
              <Input
                className="border-2 border-zinc-700 text-xs md:text-md"
                type="text"
                placeholder="nike shoes"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
            </div>
          </div>
          <Separator />
            <div className='my-2'>
                <h2 className="md:text-2xl text-sm font-bold my-2">Enter your prompt</h2>
                <Textarea 
                    className="border-2 border-zinc-700 text-xs md:text-md"
                    placeholder="Enter your customized prompt"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)} 
                />
            </div>
          <AiButton
            ref={buttonRef}
            onClick={handleGenerate}
            disabled={isLoading}
          >
            Generate Story
          </AiButton>
        </AiCard>
      </>
    );
}

export default BloggerOutreachEmail