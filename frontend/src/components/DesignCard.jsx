// src/components/DesignCard.jsx
import { Link } from "react-router-dom";

const DesignCard = ({ slug, title, image, description }) => {
  return (
    <Link
      to={`/gallery/${slug}`}
      className="group block border border-line bg-bg shadow-[16px_16px_0_#1a1a1a] overflow-hidden hover:border-accent transition-colors"
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="font-mono font-bold text-base text-ink mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-muted leading-relaxed line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
};

export default DesignCard;