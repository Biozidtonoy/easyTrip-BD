import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import "../../styles/navbar.css";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo">
          easytrip<span>Bd</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
          <Link to="/partner" className="partner-btn">
            Become a Partner
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="user-name">
                Hi, {user?.name}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link
          to="/destinations"
          onClick={() => setMenuOpen(false)}
        >
          Destinations
        </Link>

        <Link
          to="/hotels"
          onClick={() => setMenuOpen(false)}
        >
          Hotels
        </Link>

        <Link
          to="/about"
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </Link>

        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>

        <Link
          to="/partner"
          className="partner-btn mobile-partner"
          onClick={() => setMenuOpen(false)}
        >
          Become a Partner
        </Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="login-btn"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-btn"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <div className="mobile-user-name">
              Hi, {user?.name}
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;