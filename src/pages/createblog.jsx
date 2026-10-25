import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './pages.css';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [banner, setBanner] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { userAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuth?.access_token) {
      navigate('/login');
    }
  }, [userAuth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!title.trim() || !des.trim() || !content.trim() || !banner.trim()) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/blog/create-blog',
        {
          title,
          des,
          banner,
          tags: tags.split(',').map(t => t.trim()).filter(t => t),
          content: [{ type: 'text', value: content }],
          draft: false,
        },
        {
          headers: { Authorization: `Bearer ${userAuth.access_token}` },
        }
      );

      setSuccess('Blog post created successfully!');
      setTimeout(() => navigate(`/blog/${data.id}`), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating blog post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="create-blog-container">
        <div className="create-blog-card">
          <h2>Create New Post</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="create-blog-form">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog post title"
                maxLength="100"
              />
            </div>

            <div className="form-group">
              <label>Short Description (max 200 chars) *</label>
              <input
                type="text"
                value={des}
                onChange={(e) => setDes(e.target.value.substring(0, 200))}
                placeholder="Brief description of your post"
                maxLength="200"
              />
              <small>{des.length}/200</small>
            </div>

            <div className="form-group">
              <label>Banner Image URL *</label>
              <input
                type="url"
                value={banner}
                onChange={(e) => setBanner(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {banner && (
                <img src={banner} alt="preview" style={{ maxHeight: '200px', marginTop: '10px', borderRadius: '4px' }} />
              )}
            </div>

            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="javascript, react, web-development"
              />
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post content here..."
                minLength="50"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
