import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PixelBg from "../components/PixelBg";
import { API_URL } from "../lib/api";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/api/posts/${slug}`);
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <section className="relative bg-bg px-6 lg:px-11 py-16 lg:py-20">
        <p className="text-sm text-muted mx-auto max-w-6xl">Loading...</p>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className="relative bg-bg px-6 lg:px-11 py-16 lg:py-20">
        <p className="text-sm text-muted mx-auto max-w-6xl mb-2">Post not found.</p>
        <Link to="/blog" className="text-accent text-sm font-mono mx-auto max-w-6xl block">
          &larr; Back to blog
        </Link>
      </section>
    );
  }

  return (
    <section className="relative bg-bg px-6 lg:px-11 py-16 lg:py-20 overflow-hidden">
      <PixelBg />

      <div className="bg-white relative mx-auto max-w-6xl min-w-0 border-l border-line pl-5 lg:pl-6 p-5 lg:p-6">
        <Link
          to="/blog"
          className="font-mono text-xs tracking-widest text-accent mb-4 inline-block"
        >
          &larr; BACK TO BLOG
        </Link>
        <p className="font-mono text-[10px] tracking-wide text-muted mb-3">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </p>
        <h1 className="font-mono font-extrabold text-3xl text-ink mb-6">
          {post.title}
        </h1>
        <div
          className="text-sm text-ink leading-relaxed prose prose-sm max-w-none min-w-0 break-words [overflow-wrap:anywhere] [&_*]:!bg-transparent [&_*]:!text-inherit [&_img]:max-w-full [&_img]:h-auto [&_pre]:max-w-full [&_pre]:overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </section>
  );
};

export default BlogPost;
