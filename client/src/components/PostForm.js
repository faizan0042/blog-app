import { useState } from "react";

const EMPTY = { title: "", content: "", author: "", tags: "", coverImage: "" };

export default function PostForm({ initial = EMPTY, onSubmit, loading, error }) {
  const [form, setForm] = useState({
    ...EMPTY,
    ...initial,
    tags: Array.isArray(initial.tags) ? initial.tags.join(", ") : initial.tags || "",
  });

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = form.tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    onSubmit({ ...form, tags });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-msg">{error}</div>}

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={set("title")}
          placeholder="Your post title"
          required
          maxLength={150}
        />
      </div>

      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          value={form.author}
          onChange={set("author")}
          placeholder="Your name"
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={form.content}
          onChange={set("content")}
          placeholder="Write your post here…"
          required
        />
      </div>

      <div className="form-group">
        <label>Tags (comma separated)</label>
        <input
          type="text"
          value={form.tags}
          onChange={set("tags")}
          placeholder="e.g. tech, news, opinion"
        />
      </div>

      <div className="form-group">
        <label>Cover Image URL (optional)</label>
        <input
          type="url"
          value={form.coverImage}
          onChange={set("coverImage")}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Saving…" : "Publish Post"}
        </button>
      </div>
    </form>
  );
}
