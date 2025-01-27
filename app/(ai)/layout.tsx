"use client";
import React, { Suspense } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { EditorProvider, useEditorRef } from "@/hooks/useEditorRef";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideFileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import pdfDownloader from "@/helpers/pdfDownloader";
import { toast } from "sonner";
const TextEditor = dynamic(() => import("@/components/reusable/TextEditor"), {
  ssr: false,
  loading: () => <LoadingSkeleton />,
});

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <EditorProvider>
      <MainLayout>{children}</MainLayout>
    </EditorProvider>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 p-5">
      <Skeleton className="h-[400px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const editorRef = useEditorRef();
  return (
    <main className="dark">
      <SidebarProvider>
        <AppSidebar />

        <div className="flex md:h-screen bg-zinc-900 w-full">
          <section className="flex w-full min-h-screen p-4 text-white font-poppins flex-col md:flex-row">
            <div className="flex-shink flex-grow-0 md:w-1/3 w-full md:border-r border-zinc-700 pr-2">
              <SidebarTrigger className=" scale-150 text-white my-3" />
              {children}
            </div>
            <div className="flex-shink flex-grow-0 md:w-2/3 w-full pl-2 flex flex-col">
              <div className="p-4 flex-grow-0 flex-shrink flex justify-between items-center ">
                <h4 className="text-sm">Your Response will generate here</h4>
                <Button
                  size="sm"
                  onClick={() => {
                    const content = editorRef.current?.getContent()?.toString() || "";
                    if( content.includes("Your response will generate here") || content === "") {
                      toast.error("Please write your response before downloading PDF");
                      return;
                    }
                    if(content.includes('<table')) {
                      toast.error("Table is not supported in PDF");
                      return;
                    }
                    pdfDownloader(content);
                  }}
                >
                  <LucideFileDown size={24} className="text-red-500" />{" "}
                  <span>
                    Download <span className="font-bold text-red-500">PDF</span>
                  </span>
                </Button>
              </div>
              <div className="overflow-hidden overflow-y-auto flex-grow flex-shrink md:h-0 h-full p-1">
                <Suspense fallback={<LoadingSkeleton />}>
                  <TextEditor
                    ref={editorRef}
                    initialContent="## Your response will generate here"
                  />
                </Suspense>
              </div>
            </div>
          </section>
        </div>
      </SidebarProvider>
    </main>
  );
}

export default Layout;
