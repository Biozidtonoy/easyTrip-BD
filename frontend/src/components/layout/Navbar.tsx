import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import "../../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Desktop Buttons */}
        <div className="nav-actions">
          <Link
            to="/partner"
            className="mobile-partner"
            onClick={() => setMenuOpen(false)}
          >
            Become a Partner
          </Link>

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Register
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/destinations" onClick={() => setMenuOpen(false)}>
          Destinations
        </Link>

        <Link to="/hotels" onClick={() => setMenuOpen(false)}>
          Hotels
        </Link>

        <Link to="/about" onClick={() => setMenuOpen(false)}>
          About Us
        </Link>

        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>

        <button className="partner-btn mobile-partner">Become a Partner</button>

        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
