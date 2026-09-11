import { useState, useEffect } from "react";
import { API_URL } from "../lib/api";

const DesignForm = ({ onSuccess, editingItem, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setDescription(editingItem.description || "");
      setLink(editingItem.link || "");
      setExistingImage(editingItem.image || "");
      setFile(null); // don't carry over a stale file selection
    } else {
      setTitle("");
      setDescription("");
      setLink("");
      setExistingImage("");
      setFile(null);
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const isEditing = Boolean(editingItem);

    try {
      // Only upload a new image if the user picked a new file.
      // Otherwise, keep the existing image URL (important for edit mode).
      let imageUrl = existingImage;

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadRes = await fetch(`${API_URL}/api/upload`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.message || "Upload failed");
        imageUrl = uploadData.url;
      }

      if (!imageUrl) {
        throw new Error("Please select an image");
      }

      const url = isEditing
        ? `${API_URL}/api/design/${editingItem.slug}`
        : `${API_URL}/api/design`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, link, image: imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save design");

      onSuccess?.(data);
      if (!isEditing) {
        setTitle("");
        setDescription("");
        setLink("");
        setFile(null);
        setExistingImage("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="z-100 w-full min-w-0 flex flex-col gap-4 border border-line p-4 lg:p-6">
      <p className=" font-mono text-xs tracking-widest text-accent">
        {editingItem ? "EDIT DESIGN" : "NEW DESIGN"}
      </p>

      <input
        type="text"
        placeholder="Design title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
        required
      />
      <textarea
        placeholder="Short description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      />
      <input
        type="url"
        placeholder="Link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border border-line bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      />

      {existingImage && !file && (
        <div className="flex flex-wrap items-center gap-3">
          <img src={existingImage} alt="Current" className="h-16 w-16 object-cover border border-line" />
          <span className="text-xs text-muted">Current image (pick a file below to replace it)</span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm text-muted"
        required={!editingItem}
      />

      {error && <p className="text-xs text-accent">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white text-xs font-bold tracking-wide px-5 py-2.5 disabled:opacity-50 w-fit"
        >
          {loading ? "SAVING..." : editingItem ? "UPDATE DESIGN" : "ADD DESIGN"}
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

export default DesignForm;