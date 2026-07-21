import "../../styles/homeSection.css";
import { Link } from "react-router";
import "../../styles/animations.css";

const HeroSection = () => {
  return (
    <section className="hero fade-in">
      <div className="hero-overlay">
        <div className="hero-container">
          <div className="hero-content">
            <h1>
              Explore Bangladesh
              <br />
              with <span>easytripBd</span>
            </h1>

            <p>
              Discover beautiful destinations, stay in the best hotels,
              and create unforgettable memories across the beauty of
              Bangladesh.
            </p>

            <div className="hero-buttons">
              <Link to="/destinations" className="primary-btn">
                Explore Destinations
              </Link>

              <Link to="/hotels" className="secondary-btn">
                Browse Hotels
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;