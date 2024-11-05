"use client"
import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import Blockquote from '@tiptap/extension-blockquote';
import Image from 'next/image';

const RichTextEditor=({onChange}) =>{
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only render the editor on the client
  }, []);

 
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      BulletList,
      OrderedList,
      ListItem, // Required for bullet lists to work
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      
    ],
    editorProps: {
      attributes: {
        class: 
          'prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc',
       
        
      },
    },
    onUpdate :({editor})=> {
      onChange(editor.getHTML())
    },
    content : "<p>Click Here to Start typing..</p>"
   
  });
  if (!isClient) {
    return null; // Avoid rendering on the server side
  }
  

  return (
    <div>
      <div className="toolbar w-fit p-3 mx-auto border border-blue-300 rounded">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className='font-bold px-10 text-lg hover:bg-blue-100 transition'>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className='italic px-10 text-lg  hover:bg-blue-100 transition'>i</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className='px-10  hover:bg-blue-100 transition'><Image src={'/icons8-bulleted-list-50.png'} width={20} height={20} alt='ordered list'/></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className='px-10 text-2xl  hover:bg-blue-100 transition'>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className='px-10 text-xl  hover:bg-blue-100 transition'>H2</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className='px-10 text-lg  hover:bg-blue-100 transition'>
          H3
          </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className='px-10  hover:bg-blue-100 transition'>Add Code</button>
        
        <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()} className='px-10  hover:bg-blue-100 transition'
          >
            <Image src={'/list-ordered.svg'} width={20} height={20} alt='ordered-list'/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()} className='px-10  hover:bg-blue-100 transition'
            
          >
            <Image src={'/blockquote.png'} alt='""' width={20} height={20}/>
          </button>
        
        
        
      </div>
      <EditorContent editor={editor} className='prose-p:px-2  w-3/4 m-auto mt-6 p-4 border-gray-600 border rounded-lg min-h-44 focus:outline-none ' />
    </div>
  );
}
export default RichTextEditor;