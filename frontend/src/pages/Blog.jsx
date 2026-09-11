import PixelBg from "../components/PixelBg";
import BlogCard from "../components/BlogCard";
import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "../lib/api";


const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    const fetchPosts = async () =>{
      try {
        const res = await fetch(`${API_URL}/api/posts`);
        if (!res.ok) throw new Error("Failed to fetch posts")
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        setError(err.message)
      }finally{
        setLoading(false)
      }
    }
    fetchPosts()
  }, []);

  return (
    <section className="relative bg-bg px-6 lg:px-11 py-16 lg:py-20 overflow-hidden">
      <PixelBg />

      <div className="relative mx-auto mb-12 max-w-6xl border-l border-line pl-5 lg:pl-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-4">BLOG // 005</p>
        <h1 className="font-mono font-extrabold text-4xl lg:text-6xl text-ink">WRITING</h1>
      </div>
      <div className="relative mx-auto max-w-6xl">
        {loading && <p className="text-sm text-muted">Loading posts...</p>}
        {error && <p className="text-sm text-accent">{error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-sm text-muted">No posts yet.</p>
        )}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
        {posts.map((post) => (
          <BlogCard 
          key={post.slug}
          slug={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          date={new Date(post.createdAt).toLocaleDateString("en-US",{
            month: "short",
            year: "numeric"
          })}
          />
        ))}
      </div>
      </div>
    </section>
  );
};

export default Blog;