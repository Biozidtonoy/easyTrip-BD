import { Link } from "react-router-dom";
import exploreImage from "../../assets/images/explore/explore-bangladesh.jpg";
import "../../styles/animations.css";
import "../../styles/exploreBangladesh.css";

const ExploreBangladeshSection = () => {
  return (
    <section className="explore-section fade-in">
      <div className="explore-container">

        <div className="explore-image">
          <img
            src={exploreImage}
            alt="Explore Bangladesh"
          />
        </div>

        <div className="explore-content">

          <span className="section-tag">
            Discover Bangladesh
          </span>

          <h2>
            Every Journey Tells a Story
          </h2>

          <p>
            From breathtaking beaches and peaceful tea gardens
            to ancient landmarks and vibrant local culture,
            Bangladesh is full of incredible places waiting
            to be explored.
          </p>

          <ul className="explore-list">
            <li>🏖️ Beautiful Beaches</li>
            <li>🌿 Tea Gardens & Hills</li>
            <li>🏛️ Historical Landmarks</li>
            <li>🐅 Wildlife & Nature</li>
            <li>🎉 Rich Local Culture</li>
          </ul>

          <Link
            to="/destinations"
            className="explore-btn"
          >
            Start Exploring
          </Link>

        </div>

      </div>
    </section>
  );
};

export default ExploreBangladeshSection;