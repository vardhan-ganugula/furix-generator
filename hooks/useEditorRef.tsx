"use client";
import React, { useRef, useContext, createContext } from "react";
import { EditorType } from "@/app/types/customTypes";
const EditorContext = createContext<React.MutableRefObject<EditorType | null> | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const editorRef = useRef<EditorType | null>(null); // Initialize the ref with proper type

  return (
    <EditorContext.Provider value={editorRef}>
      {children}
    </EditorContext.Provider>
  );
}

// Custom hook to access the editorRef
export const useEditorRef = () => {
  const editorRef = useContext(EditorContext);

  if (!editorRef) {
    throw new Error("useEditorRef must be used within an EditorProvider");
  }

  return editorRef;
};
