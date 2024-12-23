import { Editor } from "@toast-ui/react-editor";

export const streamOutput = async (
    moduleName: Function,
    editorRef: React.MutableRefObject<Editor | null>,
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
        editorRef.current?.getInstance().setMarkdown(text);
      }
    } catch (error) {
      console.error("Error generating text:", error);
      editorRef.current?.getInstance().setMarkdown("Error generating text " + error);
    }
  };