import { useState, useEffect, useCallback } from "react";
import PostCard from "../components/PostCard";
import { fetchPosts } from "../api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPosts(search, activeTag);
      setPosts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [search, activeTag]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? "" : tag));
  };

  return (
    <main>
      <div className="container">
        <div className="page-hero">
          <h1>The Press</h1>
          <p>Stories, ideas, and dispatches — written to be read.</p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveTag(""); }}
          />
        </div>

        {allTags.length > 0 && (
          <div className="tags-wrap" style={{ marginBottom: "28px" }}>
            {allTags.map((tag) => (
              <span
                key={tag}
                className={`tag ${activeTag === tag ? "active" : ""}`}
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {error && <div className="error-msg">{error}</div>}

        {loading ? (
          <p className="loading">Loading posts…</p>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <h3>No posts yet</h3>
            <p>Be the first to write something.</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} onTagClick={handleTagClick} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
