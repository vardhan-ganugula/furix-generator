"use client";
import { AppSidebar } from "@/components/app-sidebar";
import LoadingSkeleton from "@/components/reusable/LoadingSkeleton";
import TextEditor from "@/components/reusable/TextEditor";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { EditorProvider, useEditorRef } from "@/hooks/useEditorRef";
import React, { Suspense, useCallback, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import axios from "axios";

const HistoryPage = () => {
  return (
    <EditorProvider>
      <MainLayout />
    </EditorProvider>
  );
};

const HistoryRecord = React.forwardRef<{setContent: (text: string) => void}, {createdDate: string;name: string;text: string;}>( function HistoryComponent({createdDate,name,text,}, editorRef ){
  const handleAddText = () => {
    if (editorRef && 'current' in editorRef && editorRef.current) {
      editorRef.current.setContent(text);
    }

  };
  return (
    <div className="flex flex-col space-y-1 p-2 bg-zinc-800 rounded">
      <div className="space-y-2 p-1">
        <h1 className="text-xl font-bold">{name}</h1>
        <div className="flex gap-2 items-center">
          <p className="text-xs text-gray-400">
            {format(createdDate, "PPP")}
          </p>

          <Button size="sm" onClick={handleAddText}>
            View
          </Button>
        </div>
      </div>
    </div>
  );
})
interface historyRecordProps {
    _id: string;
    userId: string;
    name: string;
    response: string;
    url: string;
    tokens: string;
    date: string;
}
function MainLayout() {
  const editorRef = useEditorRef();
  const [showLoadBtn, setShowLoadBtn] = React.useState(true);
  const [history, setHistory] = React.useState<historyRecordProps[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [start, setStart] = React.useState(0);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/get-history", { start });
      if (response.data.data.length < 10) {
        setShowLoadBtn(false);
      }
      setHistory(prev => {
        const existingIds = new Set(prev.map(record => record._id));
        const newRecords: historyRecordProps[] = response.data.data.filter((record: historyRecordProps) => !existingIds.has(record._id));
        return [...prev, ...newRecords];
      });
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [start, setHistory, setLoading, setShowLoadBtn]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <main className="dark">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex md:h-screen bg-zinc-900 w-full">
          <section className="flex w-full min-h-screen p-4 text-white font-poppins flex-col md:flex-row">
            <div className="flex-shink flex-grow-0 md:w-[400px] sm:w-full md:border-r border-zinc-700 pr-2 flex flex-col">
              <div className="px-5 flex gap-5 items-center">
                <SidebarTrigger className="scale-150 text-white my-3" />
                <h1 className="text-xl font-bold">User History</h1>
              </div>
              <div className="h-full overflow-y-auto flex flex-col gap-3">
                {history.map((record) => (
                  <HistoryRecord
                    key={record._id} 
                    createdDate={record.date}
                    name={record.name}
                    text={record.response}
                    ref={editorRef}
                  />
                ))}
                <Button
                  onClick={() => setStart((prev) => prev + 10)}
                  disabled={loading || !showLoadBtn}
                >
                  {" "}
                  {loading && <LoaderCircle className="animate-spin" />} Load
                  More
                </Button>
              </div>
            </div>
            <div className="flex-shink flex-grow-0 w-full pl-2 flex flex-col ">
              <div className="overflow-hidden overflow-y-auto flex-grow flex-shrink md:h-0 h-full p-1 border">
                <Suspense fallback={<LoadingSkeleton />}>
                  <TextEditor
                    ref={editorRef}
                    initialContent="## Your click on the view button will display the content here"
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

export default HistoryPage;
