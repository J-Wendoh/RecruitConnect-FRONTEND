import React from "react";
import { Parallax } from "react-scroll-parallax";
import "../ParallaxSection.css";

const ParallaxSection = () => {
  return (
    <div className="parallax-container">
      <Parallax speed={-10}>
        <div className="parallax-content">
          <h2>Elevate Your Career</h2>
          <p>Join thousands of professionals in finding their dream jobs.</p>
        </div>
      </Parallax>
      <Parallax speed={-20}>
        <div className="parallax-content">
          <h2>Connect with Top Talent</h2>
          <p>
            Find the perfect candidates for your company with RecruitConnect.
          </p>
        </div>
      </Parallax>
    </div>
  );
};

export default ParallaxSection;
