import { Link } from 'react-router-dom';
import './pages.css';

export default function Home() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to My Blog</h1>
          <p>Discover amazing articles and stories shared by our community</p>
          <div className="hero-buttons">
            <Link to="/feed" className="btn btn-primary">
              Read Posts
            </Link>
            <Link to="/login" className="btn btn-outline">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Blog With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Rich Content</h3>
            <p>Read and share high-quality articles on any topic</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Community</h3>
            <p>Connect with other writers and readers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Discussions</h3>
            <p>Comment and engage with other readers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Curated</h3>
            <p>Like and save your favorite posts</p>
          </div>
        </div>
      </section>
    </div>
  );
}