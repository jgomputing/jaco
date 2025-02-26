'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-white/5 animate-pulse rounded-xl" />
})

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'align',
  'link', 'image'
]

export default function QuillEditor({ value, onChange, className = '' }: QuillEditorProps) {
  return (
    <div className={`prose-editor ${className}`}>
      <style jsx global>{`
        /* Override Quill's default styles */
        .ql-snow * {
          color: white !important;
        }

        .ql-snow .ql-picker.ql-expanded .ql-picker-options {
          background-color: #1f2937 !important;
          color: white !important;
        }

        .prose-editor .ql-toolbar {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
        }
        
        .prose-editor .ql-toolbar .ql-stroke {
          stroke: rgba(255, 255, 255, 0.8) !important;
        }
        
        .prose-editor .ql-toolbar .ql-fill {
          fill: rgba(255, 255, 255, 0.8) !important;
        }
        
        .prose-editor .ql-toolbar .ql-picker {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        .prose-editor .ql-toolbar .ql-formats button:hover .ql-stroke {
          stroke: #fff !important;
        }

        .prose-editor .ql-toolbar .ql-formats button:hover .ql-fill {
          fill: #fff !important;
        }
        
        .prose-editor .ql-toolbar .ql-picker-options {
          background-color: #1f2937 !important;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .prose-editor .ql-toolbar .ql-picker-options .ql-picker-item {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        .prose-editor .ql-toolbar .ql-picker-options .ql-picker-item:hover {
          color: #fff !important;
        }
        
        .prose-editor .ql-container {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          font-family: inherit;
          font-size: 1rem;
          min-height: 200px;
        }
        
        .prose-editor .ql-editor {
          color: white !important;
          min-height: 200px;
          font-size: 16px;
          line-height: 1.6;
        }

        .prose-editor .ql-editor * {
          color: white !important;
        }
        
        .prose-editor .ql-editor.ql-blank::before {
          color: rgba(255, 255, 255, 0.4) !important;
          font-style: normal;
          font-size: 16px;
          left: 1rem;
          right: 1rem;
        }
        
        .prose-editor .ql-editor h1,
        .prose-editor .ql-editor h2,
        .prose-editor .ql-editor h3,
        .prose-editor .ql-editor h4,
        .prose-editor .ql-editor h5,
        .prose-editor .ql-editor h6 {
          color: white !important;
          font-weight: 600;
          margin: 1.5em 0 0.5em;
        }

        .prose-editor .ql-editor h1 { font-size: 2em; }
        .prose-editor .ql-editor h2 { font-size: 1.75em; }
        .prose-editor .ql-editor h3 { font-size: 1.5em; }
        .prose-editor .ql-editor h4 { font-size: 1.25em; }
        .prose-editor .ql-editor h5 { font-size: 1.1em; }
        .prose-editor .ql-editor h6 { font-size: 1em; }
        
        .prose-editor .ql-editor p {
          color: white !important;
          margin: 0 0 1em;
        }

        .prose-editor .ql-editor strong {
          color: white !important;
          font-weight: 600;
        }

        .prose-editor .ql-editor em {
          color: white !important;
        }
        
        .prose-editor .ql-editor a {
          color: #3b82f6 !important;
        }
        
        .prose-editor .ql-editor blockquote {
          border-left: 4px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8) !important;
          padding-left: 1em;
          margin: 1em 0;
        }
        
        .prose-editor .ql-editor code {
          background: rgba(255, 255, 255, 0.1);
          color: #3b82f6 !important;
          padding: 0.2em 0.4em;
          border-radius: 0.375rem;
        }
        
        .prose-editor .ql-editor pre {
          background: rgba(255, 255, 255, 0.1);
          color: white !important;
          border-radius: 0.75rem;
          padding: 1em;
          margin: 1em 0;
        }

        .prose-editor .ql-editor ul,
        .prose-editor .ql-editor ol {
          color: white !important;
          padding-left: 1.5em;
          margin: 0 0 1em;
        }

        .prose-editor .ql-editor li {
          color: white !important;
          margin: 0.5em 0;
        }

        /* Force text color for spans and other inline elements */
        .prose-editor .ql-editor span,
        .prose-editor .ql-editor font,
        .prose-editor .ql-editor div {
          color: white !important;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="rounded-xl"
      />
    </div>
  )
} 