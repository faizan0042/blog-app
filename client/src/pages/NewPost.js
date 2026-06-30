import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PostForm from "../components/PostForm";
import { createPost } from "../api";

export default function NewPost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const post = await createPost(data);
      navigate(`/posts/${post._id}`);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <Link to="/" className="back-link">← Back</Link>
      <h1>Write a new post</h1>
      <PostForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}
