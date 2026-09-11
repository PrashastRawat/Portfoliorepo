// src/pages/Projects.jsx
import { useEffect, useState } from "react";
import PixelBg from "../components/PixelBg";
import ProjectCard from "../components/ProjectCard";
import { API_URL } from "../lib/api";

const Projects = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/work`);
        if (!res.ok) throw new Error("Failed to fetch works");
        const data = await res.json();
        setWorks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  return (
    <section className="relative bg-bg px-6 lg:px-11 py-20 overflow-hidden">
      <PixelBg />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 max-w-lg border-l border-line pl-6">
          <p className="font-mono text-xs tracking-widest text-accent mb-4">WORK // 003</p>
          <h1 className="font-mono font-extrabold text-4xl lg:text-6xl text-ink">SELECTED PROJECTS</h1>
        </div>

        {loading && <p className="text-sm text-muted">Loading projects...</p>}
        {error && <p className="text-sm text-accent">{error}</p>}
        {!loading && !error && works.length === 0 && (
          <p className="text-sm text-muted">No projects yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <ProjectCard
              key={work.slug}
              slug={work.slug}
              title={work.title}
              image={work.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;