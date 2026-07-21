import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-grid">

          {/* Brand */}

          <div className="footer-brand">

            <h2>easytripBd</h2>

            <p>
              Explore Bangladesh with confidence.
              Discover breathtaking destinations,
              book amazing hotels, and create
              unforgettable memories.
            </p>

            <div className="social-icons">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaGithub />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3>Quick Links</h3>

            <ul>

              <li><a href="/">Home</a></li>

              <li><a href="/destinations">Destinations</a></li>

              <li><a href="/hotels">Hotels</a></li>

              <li><a href="/about">About</a></li>

            </ul>

          </div>

          {/* Explore */}

          <div>

            <h3>Explore</h3>

            <ul>

              <li>Cox's Bazar</li>

              <li>Sylhet</li>

              <li>Sundarbans</li>

              <li>Rangamati</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3>Contact</h3>

            <ul>

              <li>Dhaka, Bangladesh</li>

              <li>support@easytripbd.com</li>

              <li>+880 1700-000000</li>

            </ul>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 easytripBd. All rights reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;