"use client";
import React,{forwardRef, useImperativeHandle} from "react";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Markdown } from 'tiptap-markdown';
import  {Bold, Code, Italic, Strikethrough, Pilcrow, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, List, ListOrdered, Square, TextQuote, Undo, Redo} from 'lucide-react'
import './style.css'
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  interface buttonInterface {
    onClick: () => void;
    isActive: boolean;
    icon: React.ReactElement;
  }
  const allButtons: Array<buttonInterface> = [
    {
      onClick: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive("bold") || false,
      icon: <Bold size={20} />
    },
    {
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive("italic") || false,
      icon: <Italic size={20} />
    },
    {
      onClick: () => editor?.chain().focus().toggleStrike().run(),
      isActive: editor?.isActive("strike") || false,
      icon: <Strikethrough size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleCode().run(),
      isActive: editor?.isActive("code") || false,
      icon: <Code size={20} />

    },
    {
      onClick: () => editor?.chain().focus().setParagraph().run(),
      isActive: editor?.isActive("paragraph") || false,
      icon: <Pilcrow size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor?.isActive("heading", { level: 1 }) || false,
      icon: <Heading1 size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor?.isActive("heading", { level: 2 }) || false,
      icon: <Heading2 size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor?.isActive("heading", { level: 3 }) || false,
      icon: <Heading3 size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor?.isActive("heading", { level: 4 }) || false,
      icon: <Heading4 size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: editor?.isActive("heading", { level: 5 }) || false,
      icon: <Heading5 size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: editor?.isActive("heading", { level: 6 }) || false,
      icon: <Heading6 size={20} />
      
    },
    {
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor?.isActive("bulletList") || false,
      icon: <List size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editor?.isActive("orderedList") || false,
      icon: <ListOrdered size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
      isActive: editor?.isActive("codeBlock") || false,
      icon: <Square size={20} />

    },
    {
      onClick: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: editor?.isActive("blockquote") || false,
      icon: <TextQuote size={20} />

    },
    {
      onClick: () => editor?.chain().focus().undo().run(),
      isActive: false,
      icon: <Undo size={20} />

    },
    {
      onClick: () => editor?.chain().focus().redo().run(),
      isActive: false,
      icon: <Redo size={20} />

    },
  ];

  if (!editor) {
    return null;
  }

  return (
    <div className="my-2 p-2 bg-white text-black">

      <div className="flex gap-3 flex-wrap">
        {
            allButtons.map(({onClick,isActive, icon}, indx) => (
                <div key={indx} className={`${isActive? 'bg-violet-500 text-white': 'bg-white text-black'} p-2 rounded cursor-pointer text-xl` }
                    onClick={onClick}
                > 
                    {icon}
                </div>
            ) )
        }
      </div>
    </div>
  );
};



const TextEditor = forwardRef( function TextEditor({ initialContent }: {initialContent:string}, ref) {
  const editor = useEditor({
    content: initialContent,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        }
      }),
      TextStyle,
      Markdown,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    editorProps: {
      attributes: {
        class: "p-4 border border-white bg-zinc-800 tipTap",
        id: "tipTap",
      },
    },
    immediatelyRender: false,
  });

  useImperativeHandle(ref, ()=> ({
    setContent: (value:string) => {
      editor?.commands.setContent(value)
    },
    getContent: () => {
      return editor?.getHTML();
    }
  }))

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
})

export default TextEditor;
