import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../services/api';

const Profile = () => {
  const { user, loadUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authAPI.updateProfile(formData);
      await loadUser();
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingTop: '2rem' }}>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="mb-4">Profile</h2>
                {!editing ? (
                  <div>
                    <div className="mb-3">
                      <label className="text-muted">Username</label>
                      <p className="fw-bold">{user.username}</p>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted">Email</label>
                      <p className="fw-bold">{user.email}</p>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted">Full Name</label>
                      <p className="fw-bold">{user.full_name || 'Not set'}</p>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted">Bio</label>
                      <p className="fw-bold">{user.bio || 'Not set'}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setEditing(true)}>
                      Edit Profile
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Bio</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
