export interface EditorType {
  getContent: () => string;
  setContent: (content: string) => void;
}