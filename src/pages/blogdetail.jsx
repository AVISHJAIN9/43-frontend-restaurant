import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './pages.css';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  const { userAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          'http://localhost:3001/api/blog/get-blog',
          { blog_id: id }
        );
        setBlog(data);
        setComments(data.comments || []);
        setLikeCount(data.activity?.total_likes || 0);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Blog not found');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    if (!userAuth?.access_token) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:3001/api/blog/like-blog',
        { 
          _id: blog._id,
          isLikedByUser: isLiked
        },
        {
          headers: { Authorization: `Bearer ${userAuth.access_token}` },
        }
      );
      setIsLiked(data.liked);
      setLikeCount(data.liked ? likeCount + 1 : likeCount - 1);
    } catch (error) {
      console.error('Error liking blog:', error);
      setError('Failed to like post');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!userAuth?.access_token) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      setCommentLoading(true);
      await axios.post(
        'http://localhost:3001/api/blog/add-comment',
        { 
          _id: blog._id,
          comment: newComment,
          blog_author: blog.author._id
        },
        {
          headers: { Authorization: `Bearer ${userAuth.access_token}` },
        }
      );

      setNewComment('');
      setError('');
      
      // Refresh blog to show new comment
      const { data } = await axios.post(
        'http://localhost:3001/api/blog/get-blog',
        { blog_id: id }
      );
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error adding comment:', error);
      setError(error.response?.data?.error || 'Failed to post comment');
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="page-container">
        <div className="error-message">{error || 'Blog not found'}</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <article className="blog-detail-container">
        {blog.banner && (
          <img src={blog.banner} alt={blog.title} className="blog-detail-banner" />
        )}

        <div className="blog-detail-header">
          <h1>{blog.title}</h1>
          <p className="blog-detail-desc">{blog.des}</p>

          <div className="blog-detail-meta">
            {blog.author && (
              <div className="author-info">
                <img src={blog.author.profile_image} alt={blog.author.username} className="author-avatar" />
                <div>
                  <p className="author-name">{blog.author.fullname}</p>
                  <p className="author-handle">@{blog.author.username}</p>
                </div>
              </div>
            )}

            <div className="blog-stats">
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{blog.activity?.total_reads || 0} reads</span>
            </div>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags">
              {blog.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className="blog-content">
          {blog.content && blog.content.map((block, idx) => (
            <p key={idx}>{block.value || block}</p>
          ))}
        </div>

        <div className="blog-interactions">
          <button
            className={`like-button ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            ❤️ {likeCount}
          </button>
          <span>💬 {comments.length}</span>
        </div>

        <div className="comments-section">
          <h3>Comments ({comments.length})</h3>

          {userAuth?.access_token && (
            <form onSubmit={handleAddComment} className="comment-form">
              {error && <div className="error-message">{error}</div>}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                maxLength="500"
              />
              <button
                type="submit"
                disabled={commentLoading || !newComment.trim()}
                className="btn btn-primary"
              >
                {commentLoading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          )}

          {!userAuth?.access_token && (
            <p className="login-prompt">
              <a href="/login">Login</a> to comment on this post
            </p>
          )}

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((comment, idx) => (
                <div key={idx} className="comment">
                  {comment.commented_by && (
                    <>
                      <img
                        src={comment.commented_by.profile_image}
                        alt={comment.commented_by.username}
                        className="comment-avatar"
                      />
                      <div className="comment-content">
                        <p className="comment-author">@{comment.commented_by.username}</p>
                        <p className="comment-text">{comment.comment}</p>
                        <span className="comment-date">
                          {new Date(comment.commentedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
