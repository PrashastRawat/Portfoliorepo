// src/components/ProjectCard.jsx
import { Link } from "react-router-dom";

const ProjectCard = ({ slug, title, image }) => {
  return (
    <Link
      to={`/projects/${slug}`}
      className="group block border p-2 border-line bg-bg overflow-hidden  shadow-[16px_16px_0_#1a1a1a] hover:-translate-y-0.5 transition-transform"
    >
      <div className="aspect-video w-full overflow-hidden bg-line/20">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-xs text-muted font-mono">
            NO IMAGE
          </div>
        )}
      </div>
      <div className="p-4 border-t border-line">
        <h3 className="font-pixel  font-bold text-sm m-1 text-ink truncate">{title}</h3>
      </div>
    </Link>
  );
};

export default ProjectCard;