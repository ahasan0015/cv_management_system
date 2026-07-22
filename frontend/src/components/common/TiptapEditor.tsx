import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TiptapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    editorProps: {
      attributes: {
        style: "min-height: 160px; padding: 12px; outline: none; background-color: #ffffff;",
        class: "form-control shadow-none border-0",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // when user typing dont reset editor
  useEffect(() => {
    if (editor && content !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div className="text-muted p-3">Loading editor...</div>;
  }

  return (
    <div className="card border shadow-sm mb-3">
      {/* Toolbar */}
      <div className="card-header bg-light py-2 d-flex gap-2 flex-wrap border-bottom">
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive("bold") ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <i className="bi bi-type-bold"></i>
        </button>
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive("italic") ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <i className="bi bi-type-italic"></i>
        </button>
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive("heading", { level: 2 }) ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive("bulletList") ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <i className="bi bi-list-ul"></i>
        </button>
        <button
          type="button"
          className={`btn btn-sm ${editor.isActive("orderedList") ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <i className="bi bi-list-ol"></i>
        </button>
      </div>

      {/* Editor Body */}
      <div className="card-body p-0 bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};