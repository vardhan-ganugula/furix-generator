"use client";
import React, { Suspense, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { EditorProvider, useEditorRef } from "@/hooks/useEditorRef";
import { Toaster } from "@/components/ui/sonner";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ToastEditor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading : () => <LoadingSkeleton />,
  }
);

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <EditorProvider>
      <Toaster />
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
  useEffect(() => {
    editorRef.current?.getInstance().setMarkdown("hi");
  }, [editorRef.current]);
  return (
    <main className="dark">
      <SidebarProvider>
        <AppSidebar />

        <div className="flex h-screen bg-zinc-900 w-full">
          <section className="flex w-full min-h-screen p-4 text-white font-poppins">
            <div className="flex-shink flex-grow-0 w-1/3 border-r border-zinc-700 pr-2">
              <SidebarTrigger className=" scale-150 text-white my-3" />
              {children}
            </div>
            <div className="flex-shink flex-grow-0 w-2/3 pl-2">
              <div className="p-4">
                <h4>Your Response will generate here</h4>
              </div>
              <Suspense fallback={<LoadingSkeleton />}>
                <ToastEditor
                  ref={editorRef}
                  previewStyle="vertical"
                  height="90%"
                  initialEditType="wysiwyg"
                  useCommandShortcut={true}
                  theme="dark"
                  hideModeSwitch={true}
                />
              </Suspense>
            </div>
          </section>
        </div>
      </SidebarProvider>
    </main>
  );
}

export default Layout;
