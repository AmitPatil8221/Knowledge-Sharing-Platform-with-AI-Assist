import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postAPI, commentAPI, aiAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const PostDetail = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  const loadPost = async () => {
    try {
      const response = await postAPI.getById(postId);
      setPost(response.data);
    } catch (error) {
      console.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const response = await commentAPI.getByPost(postId);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to load comments');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!user) {
      toast.warning('Please login to add comments');
      return;
    }

    try {
      const response = await commentAPI.create(postId, { content: newComment });
      setComments(response.data);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Delete this comment?')) return;

    try {
      await commentAPI.delete(commentId);
      loadComments();
      toast.success('Comment deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  const handleDeletePost = async () => {
    if (!confirm('Delete this post?')) return;

    try {
      await postAPI.delete(postId);
      toast.success('Post deleted successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete post');
    }
  };

  const handleGenerateSummary = async () => {
    if (!user) {
      toast.info('Please login to generate summary');
      navigate('/login');
      return;
    }

    if (!post.description) {
      toast.error('No content to summarize');
      return;
    }

    setGeneratingSummary(true);
    try {
      const response = await aiAPI.generate({
        prompt: post.description,
        type: 'summary'
      });
      setGeneratedSummary(response.data.content);
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error('Failed to generate summary');
    } finally {
      setGeneratingSummary(false);
    }
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Post not found</div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <Link to="/" className="btn btn-link mb-3">← Back to Posts</Link>
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className="badge bg-primary">{post.category_name}</span>
                  <small className="text-muted">{new Date(post.created_at).toLocaleDateString()}</small>
                </div>
                <h1 className="mb-3">{post.title}</h1>
                <p className="text-muted mb-3">By {post.full_name || post.username}</p>
                {post.tags && (
                  <div className="mb-3">
                    {post.tags.split(',').map((tag, idx) => (
                      <span key={idx} className="badge bg-secondary me-1">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                  {post.description}
                </div>
                <div className="mb-3">
                  <button 
                    className="btn btn-outline-info btn-sm" 
                    onClick={handleGenerateSummary}
                    disabled={generatingSummary}
                  >
                    {generatingSummary ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Generating...
                      </>
                    ) : (
                      '✨ Generate Summary'
                    )}
                  </button>
                </div>
                {generatedSummary && (
                  <div className="alert alert-info">
                    <strong>Summary:</strong>
                    <p className="mb-0 mt-2">{generatedSummary}</p>
                  </div>
                )}
                {user && user.id === post.user_id && (
                  <div className="d-flex gap-2">
                    <Link to={`/edit/${postId}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={handleDeletePost}>Delete</button>
                  </div>
                )}
              </div>
            </div>

            <div className="card shadow mt-4">
              <div className="card-body p-4">
                <h4 className="mb-4">Comments ({comments.length})</h4>
                {user && (
                  <form onSubmit={handleAddComment} className="mb-4">
                    <textarea
                      className="form-control mb-2"
                      rows="3"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary btn-sm">Post Comment</button>
                  </form>
                )}
                {comments.length === 0 ? (
                  <p className="text-muted">No comments yet</p>
                ) : (
                  <div>
                    {comments.map(comment => (
                      <div key={comment.id} className="border-bottom pb-3 mb-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <strong>{comment.full_name || comment.username}</strong>
                            <small className="text-muted ms-2">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </small>
                          </div>
                          {user && user.id === comment.user_id && (
                            <button
                              className="btn btn-sm btn-link text-danger"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <p className="mb-0 mt-2">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
