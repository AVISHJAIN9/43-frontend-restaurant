import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './pages.css';

export default function Profile() {
  const { username } = useParams();
  const { userAuth } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!username && !userAuth?.username) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const targetUsername = username || userAuth.username;
        const { data } = await axios.post('http://localhost:3001/api/user/get-profile', {
          username: targetUsername,
        });
        setProfile(data.user);
        setBlogs(data.blogs || []);
        setBio(data.user?.bio || '');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, userAuth, navigate]);

  const handleUpdateBio = async () => {
    if (!userAuth?.access_token) {
      setError('You must be logged in to update your profile');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3001/api/user/update-profile',
        { bio },
        {
          headers: {
            Authorization: `Bearer ${userAuth.access_token}`,
          },
        }
      );
      setProfile({ ...profile, bio });
      setShowSettings(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const isOwnProfile = userAuth?.username === profile?.username;

  return (
    <div className="page-container">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <img
            src={profile?.profile_image || 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png'}
            alt={profile?.username}
            className="profile-avatar"
          />
          <div className="profile-info">
            <h1>{profile?.fullname}</h1>
            <p className="username">@{profile?.username}</p>
            <p className="bio">{profile?.bio || 'No bio yet'}</p>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{profile?.account_info?.total_posts || 0}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat">
                <span className="stat-value">{profile?.account_info?.total_reads || 0}</span>
                <span className="stat-label">Reads</span>
              </div>
            </div>
          </div>

          {isOwnProfile && (
            <button
              className="btn btn-primary"
              onClick={() => setShowSettings(!showSettings)}
            >
              {showSettings ? 'Cancel' : 'Edit Profile'}
            </button>
          )}
        </div>

        {/* Settings Modal */}
        {showSettings && isOwnProfile && (
          <div className="settings-modal">
            <h3>Edit Your Profile</h3>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                maxLength="500"
              />
              <small>{bio.length}/500</small>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleUpdateBio}
              >
                Save Changes
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
        )}

        {/* User's Blogs */}
        <div className="user-blogs">
          <h2>Posts by {profile?.username}</h2>
          {blogs.length === 0 ? (
            <p className="no-blogs">No posts yet</p>
          ) : (
            <div className="feed-grid">
              {blogs.map((blog) => (
                <div
                  key={blog.blog_id}
                  className="blog-card"
                  onClick={() => navigate(`/blog/${blog.blog_id}`)}
                >
                  {blog.banner && (
                    <img src={blog.banner} alt={blog.title} className="blog-banner" />
                  )}
                  <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p>{blog.des}</p>
                    <div className="blog-meta">
                      <span className="blog-date">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
