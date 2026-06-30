import { useNavigate } from "react-router-dom";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostCard({ post, onTagClick }) {
  const navigate = useNavigate();
  const excerpt = post.content.length > 180 ? post.content.slice(0, 180) + "…" : post.content;

  return (
    <article className="post-card" onClick={() => navigate(`/posts/${post._id}`)}>
      <h2 className="post-card-title">{post.title}</h2>
      <p className="post-card-excerpt">{excerpt}</p>
      <div className="post-meta">
        <span className="post-meta-author">{post.author}</span>
        <span className="post-meta-sep">·</span>
        <span>{formatDate(post.createdAt)}</span>
      </div>
      {post.tags?.length > 0 && (
        <div className="tags-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick?.(tag);
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
