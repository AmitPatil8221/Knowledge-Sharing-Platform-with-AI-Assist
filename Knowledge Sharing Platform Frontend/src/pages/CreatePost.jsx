import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postAPI, categoryAPI } from '../services/api';
import AIModal from '../components/AIModal';

const CreatePost = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    summary: '',
    category_id: '',
    tags: ''
  });
  const [categories, setCategories] = useState([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiType, setAiType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
    if (postId) loadPost();
  }, [postId]);

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  const loadPost = async () => {
    try {
      const response = await postAPI.getById(postId);
      setFormData({
        title: response.data.title,
        description: response.data.description,
        summary: response.data.summary || '',
        category_id: response.data.category_id,
        tags: response.data.tags || ''
      });
    } catch (error) {
      toast.error('Failed to load post');
    }
  };

  const handleAIGenerate = (content) => {
    if (aiType === 'content') {
      setFormData({ ...formData, description: content });
    } else if (aiType === 'summary') {
      setFormData({ ...formData, summary: content });
    } else if (aiType === 'tags') {
      setFormData({ ...formData, tags: content });
    } else if (aiType === 'improve') {
      setFormData({ ...formData, description: content });
    } else if (aiType === 'title') {
      setFormData({ ...formData, title: content });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      if (postId) {
        await postAPI.update(postId, data);
        toast.success('Post updated successfully!');
      } else {
        await postAPI.create(data);
        toast.success('Post created successfully!');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="mb-4">{postId ? 'Edit Post' : 'Create New Post'}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label mb-0">Title</label>
                      {formData.description && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setAiType('title');
                            setShowAIModal(true);
                          }}
                        >
                          ✨ Suggest Better Title
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label mb-0">Description</label>
                      <div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setAiType('content');
                            setShowAIModal(true);
                          }}
                        >
                          ✨ Generate with AI
                        </button>
                        {formData.description && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            onClick={() => {
                              setAiType('improve');
                              setShowAIModal(true);
                            }}
                          >
                            🔧 Improve with AI
                          </button>
                        )}
                      </div>
                    </div>
                    <textarea
                      className="form-control"
                      rows="8"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label mb-0">Summary (for preview)</label>
                      {formData.description && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => {
                            setAiType('summary');
                            setShowAIModal(true);
                          }}
                        >
                          📝 Generate Summary
                        </button>
                      )}
                    </div>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Short summary for article cards (optional)"
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label mb-0">Tags (comma separated)</label>
                      {formData.description && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => {
                            setAiType('tags');
                            setShowAIModal(true);
                          }}
                        >
                          ✨ Generate Tags
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. javascript, react, tutorial"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <AIModal
          show={showAIModal}
          onClose={() => setShowAIModal(false)}
          onGenerate={handleAIGenerate}
          type={aiType}
        />
      </div>
    </div>
  );
};

export default CreatePost;
