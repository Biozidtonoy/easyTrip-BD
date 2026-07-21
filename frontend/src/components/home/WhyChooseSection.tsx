import "../../styles/whyChoose.css";
import "../../styles/animations.css";
import { features } from "../../data/features";
import FeatureCard from "./FeatureCard";

const WhyChooseSection = () => {
  return (
    <section className="why-section fade-in">
      <div className="why-container">

        <div className="section-title">

          <h2>Why Choose easytripBd</h2>

          <p>
            Everything you need for a smooth and memorable
            travel experience across Bangladesh.
          </p>

        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              {...feature}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;