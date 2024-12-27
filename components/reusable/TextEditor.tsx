"use client";
import React,{forwardRef, useEffect, useImperativeHandle, useState} from "react";
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
import { buttonInterface } from "@/types/customTypes";



const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [size, setSize] = useState<number>(20)
  useEffect(() => {
    const changeSize = () => { 
      setSize(window.innerWidth <= 768 ? 15 : 20)
    }
    changeSize()
    window.addEventListener('resize',  changeSize);

    return () => {
      window.removeEventListener('resize', changeSize)
    }
  }, [])
  const allButtons: Array<buttonInterface> = [
    {
      onClick: () => editor?.chain().focus().toggleBold().run(),
      isActive: editor?.isActive("bold") || false,
      icon: Bold
    },
    {
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      isActive: editor?.isActive("italic") || false,
      icon: Italic
    },
    {
      onClick: () => editor?.chain().focus().toggleStrike().run(),
      isActive: editor?.isActive("strike") || false,
      icon: Strikethrough

    },
    {
      onClick: () => editor?.chain().focus().toggleCode().run(),
      isActive: editor?.isActive("code") || false,
      icon: Code

    },
    {
      onClick: () => editor?.chain().focus().setParagraph().run(),
      isActive: editor?.isActive("paragraph") || false,
      icon: Pilcrow

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor?.isActive("heading", { level: 1 }) || false,
      icon: Heading1

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor?.isActive("heading", { level: 2 }) || false,
      icon: Heading2

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor?.isActive("heading", { level: 3 }) || false,
      icon: Heading3

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor?.isActive("heading", { level: 4 }) || false,
      icon: Heading4

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: editor?.isActive("heading", { level: 5 }) || false,
      icon: Heading5

    },
    {
      onClick: () => editor?.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: editor?.isActive("heading", { level: 6 }) || false,
      icon: Heading6
      
    },
    {
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
      isActive: editor?.isActive("bulletList") || false,
      icon: List

    },
    {
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
      isActive: editor?.isActive("orderedList") || false,
      icon: ListOrdered

    },
    {
      onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
      isActive: editor?.isActive("codeBlock") || false,
      icon: Square

    },
    {
      onClick: () => editor?.chain().focus().toggleBlockquote().run(),
      isActive: editor?.isActive("blockquote") || false,
      icon: TextQuote

    },
    {
      onClick: () => editor?.chain().focus().undo().run(),
      isActive: false,
      icon: Undo

    },
    {
      onClick: () => editor?.chain().focus().redo().run(),
      isActive: false,
      icon: Redo

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
                    {React.createElement(icon, {size})}
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
        class: "p-4 border border-white focus:border-0 transition bg-zinc-800 tipTap",
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
    <div className="relative">

      <MenuBar editor={editor} />
      <div className="max-h-[78vh] overflow-y-auto mt-5 custom_thumb">
        <EditorContent editor={editor} />
      </div>
    </div>
    </>
  );
})

export default TextEditor;
