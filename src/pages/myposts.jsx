import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './pages.css';

export default function MyPosts() {
  const { userAuth } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuth?.access_token) {
      navigate('/login');
      return;
    }

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        // Fetch user profile with their blogs
        const { data } = await axios.post(
          'http://localhost:3001/api/user/get-profile',
          {
            username: userAuth.username,
          },
          {
            headers: {
              Authorization: `Bearer ${userAuth.access_token}`,
            },
          }
        );
        setPosts(data.blogs || []);
        setError('');
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load your posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userAuth, navigate]);

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      // Note: You may need to add a delete endpoint in your backend
      // For now, this is a placeholder that references the id
      alert(`Delete functionality coming soon for ${blogId}`);
    } catch {
      setError('Failed to delete post');
    }
  };

  if (!userAuth?.access_token) {
    return (
      <div className="page-container">
        <div className="error-message">Please log in to view your posts</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="my-posts-container">
        <div className="posts-header">
          <div>
            <h1>My Posts</h1>
            <p>Manage and view all your published articles</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/create')}
          >
            + Create New Post
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h2>No posts yet</h2>
            <p>Start sharing your thoughts and expertise with the world!</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/create')}
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="posts-list">
            <div className="posts-stats">
              <div className="stat-card">
                <span className="stat-number">{posts.length}</span>
                <span className="stat-text">Total Posts</span>
              </div>
            </div>

            <div className="posts-table">
              {posts.map((post) => (
                <div key={post.blog_id} className="post-row">
                  <div className="post-info">
                    <h3>{post.title}</h3>
                    <p>{post.des}</p>
                    <div className="post-meta">
                      <span className="date">
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <div className="tags">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="tag">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="post-actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => navigate(`/blog/${post.blog_id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() => navigate(`/edit/${post.blog_id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(post.blog_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
