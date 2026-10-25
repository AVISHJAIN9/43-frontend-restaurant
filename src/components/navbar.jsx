import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userAuth, setUserAuth } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserAuth({});
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📝 MyBlog
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/feed" onClick={() => setMenuOpen(false)}>All Posts</Link>
          </li>
          <li className="nav-item">
            <Link to="/search" onClick={() => setMenuOpen(false)}>Search</Link>
          </li>

          {userAuth?.access_token ? (
            <>
              <li className="nav-item">
                <Link to="/my-posts" onClick={() => setMenuOpen(false)}>My Posts</Link>
              </li>
              <li className="nav-item">
                <Link to="/create" onClick={() => setMenuOpen(false)}>Create Post</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              </li>
              <li className="nav-item user-info">
                <span>@{userAuth.username || userAuth.email}</span>
                <button className="btn btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}