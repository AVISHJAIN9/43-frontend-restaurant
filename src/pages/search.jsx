import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const popularTags = [
    'javascript',
    'react',
    'nodejs',
    'web-development',
    'tutorial',
    'tips',
    'technology',
    'productivity',
  ];

  const handleSearch = async (e, newPage = 1) => {
    e?.preventDefault();
    if (!searchQuery && !selectedTag) return;

    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:3001/api/blog/search-blogs', {
        query: searchQuery,
        tag: selectedTag,
        page: newPage,
      });
      setBlogs(data.blogs || []);
      setPage(newPage);
      setSearched(true);
    } catch (err) {
      console.error('Search error:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = async (tag) => {
    setSelectedTag(tag);
    setSearchQuery('');
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:3001/api/blog/search-blogs', {
        tag,
        page: 1,
      });
      setBlogs(data.blogs || []);
      setPage(1);
      setSearched(true);
    } catch (err) {
      console.error('Error:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="search-container">
        {/* Search Header */}
        <div className="search-header">
          <h1>Search & Explore</h1>
          <p>Find articles by keywords or browse by tags</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {selectedTag && (
            <div className="active-tag">
              Tag: <strong>{selectedTag}</strong>
              <button
                type="button"
                onClick={() => {
                  setSelectedTag('');
                  setSearched(false);
                  setBlogs([]);
                }}
                className="tag-close"
              >
                ✕
              </button>
            </div>
          )}
        </form>

        {/* Popular Tags */}
        <div className="tags-section">
          <h3>Popular Tags</h3>
          <div className="tags-grid">
            {popularTags.map((tag) => (
              <button
                key={tag}
                className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="search-results">
          {loading && <div className="spinner"></div>}

          {searched && !loading && blogs.length === 0 && (
            <p className="no-blogs">No articles found. Try different keywords or tags.</p>
          )}

          {blogs.length > 0 && (
            <>
              <h3>Results ({blogs.length})</h3>
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
                        {blog.tags && (
                          <div className="blog-tags">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="tag">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="blog-date">
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      {blog.author && (
                        <div className="blog-author">
                          By <strong>@{blog.author.username}</strong>
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
                      onClick={(e) => handleSearch(e, page - 1)}
                    >
                      ← Previous
                    </button>
                  )}
                  <span>Page {page}</span>
                  <button
                    className="btn btn-outline"
                    onClick={(e) => handleSearch(e, page + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
