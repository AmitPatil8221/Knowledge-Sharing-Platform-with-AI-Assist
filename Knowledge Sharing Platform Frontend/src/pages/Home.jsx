import { useState, useEffect } from 'react';
import { postAPI, categoryAPI } from '../services/api';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [search, selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  const loadPosts = async () => {
    try {
      const response = await postAPI.getAll({ search, category: selectedCategory });
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadPosts();
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-3">Knowledge Sharing Platform</h1>
              <p className="lead mb-4">Share your knowledge, learn from others, and grow together with AI-powered assistance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <div className="row mb-4">
          <div className="col-md-8">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">Search</button>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No posts found</p>
          </div>
        ) : (
          <div className="row g-4">
            {posts.map(post => (
              <div key={post.id} className="col-md-6 col-lg-4">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
