'use client'
import {EditorType} from "@/app/types/customTypes";
import axios from "axios";
export const streamOutput = async (
    moduleName: Function,
    editorRef: React.MutableRefObject<EditorType | null>,
    ...args: any[]
  ): Promise<void> => {
    try {
      const response = await moduleName(args);
      const reader = response.getReader();
      const decoder = new TextDecoder();
      let text = "";
      let done = false;
      while (!done) {
        const { value, done: doneValue } = await reader.read();
        text += decoder.decode(value);
        done = doneValue;
        editorRef.current?.setContent(text)
      }
      if(done){
        axios.post('/api/v1/deduct-tokens', {
          text, cost : 50
        }).then(res => {
          console.log(res.data)
        }).catch(err => {
          console.error(err)
        })
      }
    } catch (error) {
      console.error("Error generating text:", error);
      editorRef.current?.setContent("Error generating text " + error);
    }
  };