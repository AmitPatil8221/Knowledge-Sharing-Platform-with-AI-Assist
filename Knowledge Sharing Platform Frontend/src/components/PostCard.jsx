import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="card h-100 shadow-sm" style={{ transition: 'all 0.3s ease' }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>{post.category_name}</span>
          <small className="text-muted">{new Date(post.created_at).toLocaleDateString()}</small>
        </div>
        <h5 className="card-title fw-bold">{post.title}</h5>
        <p className="card-text text-muted">
          {post.summary || post.description.substring(0, 150) + '...'}
        </p>
        {post.tags && (
          <div className="mb-2">
            {post.tags.split(',').map((tag, idx) => (
              <span key={idx} className="badge bg-secondary me-1">{tag}</span>
            ))}
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">By {post.full_name || post.username}</small>
          <Link to={`/posts/${post.id}`} className="btn btn-sm btn-primary">Read More</Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
