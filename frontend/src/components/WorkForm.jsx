// src/components/WorkForm.jsx
import { useState, useEffect } from "react";
import { API_URL } from "../lib/api";

const WorkForm = ({ onSuccess, editingItem, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // When editingItem changes, populate the form with its data
  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setDescription(editingItem.description || "");
      setGithubLink(editingItem.githubLink || "");
      setLink(editingItem.link || "");
      setImage(editingItem.image || "");
    } else {
      setTitle("");
      setDescription("");
      setGithubLink("");
      setLink("");
      setImage("");
    }
  }, [editingItem]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file); // must match the field name your Multer route expects

    try {
      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        credentials: "include",
        body: formData, // no Content-Type header — browser sets multipart boundary automatically
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      setImage(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = ""; // allow re-selecting the same file if needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const isEditing = Boolean(editingItem);
    const url = isEditing
      ? `${API_URL}/api/work/${editingItem.slug}`
      : `${API_URL}/api/work`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, githubLink, link, image }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save");

      onSuccess?.(data);
      if (!isEditing) {
        setTitle("");
        setDescription("");
        setGithubLink("");
        setLink("");
        setImage("");
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
        {editingItem ? "EDIT PROJECT" : "NEW PROJECT"}
      </p>

      <input type="text" placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent" required />
      <textarea placeholder="Project description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent" required />
      <input type="url" placeholder="GitHub URL" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent" />
      <input type="url" placeholder="Live project URL" value={link} onChange={(e) => setLink(e.target.value)} className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent" />

      {/* Image: upload or paste URL */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <label className="border border-line text-muted text-xs font-bold tracking-wide px-4 py-2.5 cursor-pointer hover:border-accent hover:text-accent transition-colors w-fit">
            {uploading ? "UPLOADING..." : "UPLOAD IMAGE"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </label>
          {image && (
            <img
              src={image}
              alt="Preview"
              className="h-12 w-12 object-cover border border-line"
            />
          )}
        </div>

        <input
          type="url"
          placeholder="Or paste image URL directly"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        />
      </div>

      {error && <p className="text-xs text-accent">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={loading || uploading} className="bg-accent text-white text-xs font-bold tracking-wide px-5 py-2.5 disabled:opacity-50 w-fit">
          {loading ? "SAVING..." : editingItem ? "UPDATE PROJECT" : "ADD PROJECT"}
        </button>
        {editingItem && (
          <button type="button" onClick={onCancelEdit} className="border border-line text-muted text-xs font-bold tracking-wide px-5 py-2.5 w-fit">
            CANCEL
          </button>
        )}
      </div>
    </form>
  );
};

export default WorkForm;