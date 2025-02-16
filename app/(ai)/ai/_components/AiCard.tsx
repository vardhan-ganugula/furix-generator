import { Button } from "@/components/ui/button";
import {LoaderCircle} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Frame } from "lucide-react";
import React from "react";

const AiCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="bg-zinc-800">
      <CardHeader>
        <CardTitle className="lg:text-4xl text-2xl flex items-center gap-4">
          <Frame />
          {title}
        </CardTitle>
        <CardDescription className="text-xs md:text-sm lg:text-md">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export const AiButton = React.forwardRef<
  HTMLButtonElement,
  {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
  }
>(function AiButton({ onClick, children, className, disabled }, btnRef) {
  return (
    <Button
      onClick={onClick}
      className={`mt-4 disabled:cursor-wait bg-white px-3 py-2 rounded text-black text-xs ${className} disabled:cursor-not-allowed`}
      ref={btnRef}
      disabled = {disabled}
    >
      <>

      {disabled && <LoaderCircle className="w-4 h-4 animate-spin" />}

      {children}
      </>  
    </Button>
  );
});
export default AiCard;
