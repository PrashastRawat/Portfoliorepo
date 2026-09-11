import { Link } from "react-router-dom";

const BlogCard = ({ slug, title, excerpt, date }) => {
  return (
    <Link
      to={`/blog/${slug}`}
      className="block border border-line bg-bg p-6 hover:border-accent transition-colors"
    >
      <div className="h-6 w-6 bg-accent mb-5" />
      <p className="font-mono text-[10px] tracking-wide text-muted mb-2">{date}</p>
      <h3 className="font-mono font-bold text-base text-ink mb-2">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{excerpt}</p>
    </Link>
  );
};

export default BlogCard;