import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPost, deletePost } from "../api";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPost(id)
      .then(setPost)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await deletePost(id);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setDeleting(false);
    }
  };

  if (loading) return <div className="container loading">Loading…</div>;
  if (error) return <div className="container" style={{ padding: "40px 24px" }}><div className="error-msg">{error}</div></div>;
  if (!post) return null;

  return (
    <div className="container single-post">
      <Link to="/" className="back-link">← Back to all posts</Link>

      <article>
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            style={{ width: "100%", height: "320px", objectFit: "cover", marginBottom: "32px", borderRadius: "2px" }}
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        <header className="single-post-header">
          <h1 className="single-post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-meta-author">{post.author}</span>
            <span className="post-meta-sep">·</span>
            <span>{formatDate(post.createdAt)}</span>
            {post.updatedAt !== post.createdAt && (
              <>
                <span className="post-meta-sep">·</span>
                <span>Updated {formatDate(post.updatedAt)}</span>
              </>
            )}
          </div>
          {post.tags?.length > 0 && (
            <div className="tags-wrap">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div className="single-post-body">{post.content}</div>
      </article>

      <div style={{ display: "flex", gap: "12px", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--rule)" }}>
        <button className="btn btn-outline btn-sm" onClick={() => navigate(`/edit/${id}`)}>
          Edit Post
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
