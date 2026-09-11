// src/components/PostForm.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { API_URL } from "../lib/api";

const PostForm = ({ onSuccess, editingItem, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Upload failed");

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", data.url);
        quill.setSelection(range.index + 1);
      } catch (err) {
        setError(err.message);
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setExcerpt(editingItem.excerpt || "");
      setContent(editingItem.content || "");
    } else {
      setTitle("");
      setExcerpt("");
      setContent("");
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const isEditing = Boolean(editingItem);
    const url = isEditing
      ? `${API_URL}/api/posts/${editingItem.slug}`
      : `${API_URL}/api/posts`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, excerpt, content }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save post");

      onSuccess?.(data);
      if (!isEditing) {
        setTitle("");
        setExcerpt("");
        setContent("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-0 flex flex-col gap-4 border border-line p-4 lg:p-6">
      <p className="font-mono text-xs tracking-widest text-accent">
        {editingItem ? "EDIT POST" : "NEW POST"}
      </p>

      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        required
      />
      <input
        type="text"
        placeholder="Short excerpt (shown on the blog list page)"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        required
      />

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        className="bg-bg min-w-0 [&_.ql-toolbar]:overflow-x-auto [&_.ql-container]:max-w-full [&_.ql-editor]:break-words"
      />

      {error && <p className="text-xs text-accent">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white text-xs font-bold tracking-wide px-5 py-2.5 disabled:opacity-50 w-fit"
        >
          {loading ? "SAVING..." : editingItem ? "UPDATE POST" : "PUBLISH POST"}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="border border-line text-muted text-xs font-bold tracking-wide px-5 py-2.5 w-fit"
          >
            CANCEL
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;