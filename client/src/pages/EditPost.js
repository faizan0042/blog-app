import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import { fetchPost, updatePost } from "../api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost(id)
      .then(setPost)
      .catch((e) => setError(e.message))
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await updatePost(id, data);
      navigate(`/posts/${id}`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  if (fetching) return <div className="container loading">Loading…</div>;

  return (
    <div className="form-page">
      <Link to={`/posts/${id}`} className="back-link">← Back to post</Link>
      <h1>Edit post</h1>
      {post && (
        <PostForm initial={post} onSubmit={handleSubmit} loading={loading} error={error} />
      )}
    </div>
  );
}
