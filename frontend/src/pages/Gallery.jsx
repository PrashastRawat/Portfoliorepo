// src/pages/Gallery.jsx
import { useEffect, useState } from "react";
import PixelBg from "../components/PixelBg";
import DesignCard from "../components/DesignCard";
import { API_URL } from "../lib/api";

const Gallery = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await fetch(`${API_URL}/api/design`);
        if (!res.ok) throw new Error("Failed to fetch designs");
        const data = await res.json();
        setDesigns(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);

  return (
    <section className="relative bg-bg px-6 lg:px-11 py-20 overflow-hidden">
      <PixelBg />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 max-w-lg border-l border-line pl-6">
          <p className="font-mono text-xs tracking-widest text-accent mb-4">GALLERY // 004</p>
          <h1 className="font-mono font-extrabold text-4xl lg:text-6xl text-ink">GALLERY</h1>
        </div>

        {loading && <p className="text-sm text-muted">Loading images...</p>}
        {error && <p className="text-sm text-accent">{error}</p>}
        {!loading && !error && designs.length === 0 && (
          <p className="text-sm text-muted">No images yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design) => (
            <DesignCard
              key={design.slug}
              slug={design.slug}
              image={design.image}
              title={design.title}
              description={design.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;