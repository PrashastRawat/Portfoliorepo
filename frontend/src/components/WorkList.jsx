// src/components/WorkList.jsx
import { useState, useEffect } from "react";
import { API_URL } from "../lib/api";

const WorkList = ({ items, onEdit, onDeleted, onReorder }) => {
  const [localItems, setLocalItems] = useState(items);
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // Keep localItems in sync when the parent's items change (e.g. after fetch/delete)
  useEffect(() => {
    setLocalItems(items);
    setIsDirty(false);
  }, [items]);

  const handleDelete = async (slug) => {
    if (!confirm("Delete this project")) return;
    try {
      const res = await fetch(`${API_URL}/api/work/${slug}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
      onDeleted(slug);
    } catch (error) {
      alert(error.message);
    }
  };

  const moveItem = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= localItems.length) return;

    const reordered = [...localItems];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    setLocalItems(reordered);
    setIsDirty(true);
  };

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await onReorder(localItems);
      setIsDirty(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setLocalItems(items); // revert to last saved order
    setIsDirty(false);
  };

  if (localItems.length === 0) {
    return <p className="text-sm text-muted mt-6">No projects yet.</p>;
  }

  return (
    <div className="mt-8">
      {isDirty && (
        <div className="flex items-center justify-between border border-accent bg-accent/5 px-4 py-3 mb-4">
          <p className="text-xs font-mono text-accent tracking-wide">UNSAVED ORDER CHANGES</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="border border-line text-muted text-xs font-bold tracking-wide px-4 py-2 disabled:opacity-50"
            >
              CANCEL
            </button>
            <button
              onClick={handleConfirm}
              disabled={saving}
              className="bg-accent text-white text-xs font-bold tracking-wide px-4 py-2 disabled:opacity-50"
            >
              {saving ? "SAVING..." : "CONFIRM ORDER"}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-muted">
            <th className="py-2 font-mono font-normal">ORDER</th>
            <th className="py-2 font-mono font-normal">TITLE</th>
            <th className="py-2 font-mono font-normal">LINK</th>
            <th className="py-2 font-mono font-normal"></th>
          </tr>
        </thead>
        <tbody>
          {localItems.map((item, index) => (
            <tr key={item._id} className="border-b border-line">
              <td className="py-3">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    className="text-xs text-muted hover:text-accent disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveItem(index, 1)}
                    disabled={index === localItems.length - 1}
                    className="text-xs text-muted hover:text-accent disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
              </td>
              <td className="py-3 text-ink">{item.title}</td>
              <td className="py-3 text-muted truncate max-w-[200px]">
                {item.link || "—"}
              </td>
              <td className="py-3 text-right">
                <button
                  onClick={() => onEdit(item)}
                  className="text-accent text-xs font-bold mr-4"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(item.slug)}
                  className="text-muted text-xs font-bold hover:text-accent"
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default WorkList;