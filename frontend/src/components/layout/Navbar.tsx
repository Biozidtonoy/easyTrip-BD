import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import "../../styles/navbar.css";
import { useAuth } from "../../hooks/useAuth";
import { getNavigationLinks } from "../../utils/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = getNavigationLinks(
    isAuthenticated,
    user?.role
  );

  // console.log("User:", user);
  // console.log("Role:", user?.role);
  // console.log("Nav Links:", navLinks);

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
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
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
                {user?.name}
                <small className="user-role">
                  {user?.role.replace("_", " ")}
                </small>
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
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

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
              {user?.name}
              <small className="user-role">
                {user?.role.replace("_", " ")}
              </small>
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