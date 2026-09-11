// src/pages/DesignDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PixelBg from "../components/PixelBg";
import DesignCard from "../components/DesignCard";
import { API_URL } from "../lib/api";

const DesignDetail = () => {
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [designRes, allRes] = await Promise.all([
          fetch(`${API_URL}/api/design/${slug}`),
          fetch(`${API_URL}/api/design`),
        ]);

        if (!designRes.ok) throw new Error("Design not found");

        const designData = await designRes.json();
        const allData = await allRes.json();

        setDesign(designData);

        const others = allData.filter((d) => d.slug !== slug);
        const shuffled = [...others].sort(() => Math.random() - 0.5);
        setRelated(shuffled.slice(0, 3));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <section className="relative bg-bg px-6 lg:px-11 py-20 overflow-hidden min-h-screen">
      <PixelBg />

      <div className="relative mx-auto max-w-4xl">
        <Link
          to="/gallery"
          className="font-mono text-xs tracking-widest text-accent hover:underline"
        >
          ← BACK TO GALLERY
        </Link>

        {loading && <p className="text-sm text-muted mt-6">Loading...</p>}
        {error && <p className="text-sm text-accent mt-6">{error}</p>}

        {!loading && !error && design && (
          <div className="mt-6">
            <div className="border border-line shadow-[3px_3px_0_#1a1a1a] lg:shadow-[6px_6px_0_#1a1a1a] overflow-hidden mb-8">
              <img src={design.image} alt={design.title} className="w-full object-cover" />
            </div>

            <h1 className="font-mono font-extrabold text-3xl lg:text-4xl text-ink mb-4">
              {design.title}
            </h1>

            <p className="text-sm text-muted leading-relaxed whitespace-pre-line mb-8">
              {design.description}
            </p>

            {design.link && (
              <a
                href={design.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-white text-xs font-bold tracking-wide px-5 py-2.5 mb-16"
              >
                VIEW LINK →
              </a>
            )}
          </div>
        )}

        {!loading && !error && related.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-xs tracking-widest text-accent mb-6">MORE DESIGNS</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <DesignCard
                  key={item.slug}
                  slug={item.slug}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignDetail;