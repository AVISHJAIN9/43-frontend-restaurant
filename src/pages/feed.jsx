import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export default function Feed() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post('http://localhost:3001/api/blog/latest-blogs', {
          page,
        });
        setBlogs(data.blogs || []);
        setError('');
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blogs');
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page]);

  return (
    <div className="page-container">
      <div className="feed-container">
        <div className="feed-header">
          <h1>All Posts</h1>
          <p>Read articles from our community of writers</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : blogs.length > 0 ? (
          <>
            <div className="blog-grid">
              {blogs.map((blog) => (
                <div
                  key={blog.blog_id}
                  className="blog-card"
                  onClick={() => navigate(`/blog/${blog.blog_id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {blog.banner && (
                    <img src={blog.banner} alt={blog.title} className="blog-banner" />
                  )}
                  <div className="blog-card-content">
                    <h3>{blog.title || 'Untitled'}</h3>
                    <p>{blog.des || 'No description available.'}</p>
                    <div className="blog-meta">
                      {blog.author && (
                        <span className="author">@{blog.author.username}</span>
                      )}
                      <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="blog-tags">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {blogs.length >= 5 && (
              <div className="pagination">
                {page > 1 && (
                  <button
                    className="btn btn-outline"
                    onClick={() => setPage(page - 1)}
                  >
                    ← Previous Page
                  </button>
                )}
                <span className="page-number">Page {page}</span>
                <button
                  className="btn btn-outline"
                  onClick={() => setPage(page + 1)}
                >
                  Next Page →
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="no-blogs">No blog posts available. Be the first to post!</p>
        )}
      </div>
    </div>
  );
}
 