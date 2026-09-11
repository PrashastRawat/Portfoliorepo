// src/pages/ProjectDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PixelBg from "../components/PixelBg";
import { API_URL } from "../lib/api";

const ProjectDetail = () => {
  const { slug } = useParams();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/api/work/${slug}`);
        if (!res.ok) throw new Error("Project not found");
        const data = await res.json();
        setWork(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWork();
  }, [slug]);

  return (
    <section className="relative bg-bg px-6 lg:px-11 py-16 lg:py-20 overflow-hidden min-h-screen">
      <PixelBg />

      <div className="relative mx-auto max-w-7xl">
        <Link
          to="/projects"
          className="font-mono text-xs tracking-widest text-accent hover:underline"
        >
          ← BACK TO PROJECTS
        </Link>

        {loading && <p className="text-sm text-muted mt-6">Loading...</p>}
        {error && <p className="text-sm text-accent mt-6">{error}</p>}

        {!loading && !error && work && (
          <div className="mt-6">
            <h1 className="font-mono font-extrabold text-3xl lg:text-4xl text-ink mb-8 break-words">
              {work.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:flex-1 bg-white p-6 lg:p-10 shadow-[4px_4px_0_#1a1a1a] lg:shadow-[16px_16px_0_#1a1a1a]">
                <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                  {work.description}
                </p>
              </div>

              {work.image && (
                <div className="w-full md:w-3/5 border border-line bg-white shadow-[4px_4px_0_#1a1a1a] lg:shadow-[16px_16px_0_#1a1a1a] overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {work.githubLink && (
                <a
                  href={work.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border bg-white border-line text-ink shadow-[2px_2px_0_#1a1a1a] text-xs font-bold tracking-wide px-5 py-2.5 hover:border-accent hover:text-accent transition-colors"
                >
                  GITHUB →
                </a>
              )}
              {work.link && (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-white shadow-[2px_2px_0_#1a1a1a] text-xs font-bold tracking-wide px-5 py-2.5"
                >
                  LIVE SITE →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;