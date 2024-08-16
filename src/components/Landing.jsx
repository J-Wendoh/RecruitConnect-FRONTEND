import React from "react";
import { useSpring, animated } from "react-spring";
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";
import { Search, Briefcase, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Testimonials from "./Testimonials";
import AwardsSection from "./AwardsSection";
import RevolvingGlobe from "./RevolvingGlobe";
import "../Landing.css";

const AnimatedSection = ({ children }) => {
  const props = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });
  return <animated.div style={props}>{children}</animated.div>;
};

const Landing = () => {
  const navigate = useNavigate();

  const handleFindJobsClick = () => {
    navigate('/joblist');
  };

  return (
    <div className="landing-page">
      <AnimatedSection>
        <RevolvingGlobe>
          <section className="hero">
            <div className="container">
              <h1>Find Your Dream Job with RecruitConnect</h1>
              <p>
                Connecting talented professionals with amazing opportunities,
                anywhere in the world
              </p>

              <div className="cta-buttons">
                <button
                  className="btn btn-primary"
                  onClick={handleFindJobsClick}
                >
                  Find Jobs
                </button>
                <Link to="/jobposting">
                  {" "}
                  <button className="btn btn-secondary">Post a Job</button>
                </Link>
              </div>
            </div>
          </section>
        </RevolvingGlobe>
      </AnimatedSection>

      <AnimatedSection className="key-features">
        <h2 className='choose'>Why Choose RecruitConnect</h2>{" "}
        <div className="features-grid">
          <div className="feature">
            <Search size={64} />
            <h3>Smart Job Matching</h3>
            <p>AI-powered algorithm to find your perfect fit</p>
          </div>
          <div className="feature">
            <Briefcase size={64} />
            <h3>Global Opportunities</h3>
            <p>Connect with employers worldwide</p>
          </div>
          <div className="feature">
            <TrendingUp size={64} />
            <h3>Career Insights</h3>
            <p>Get valuable industry trends and salary information</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mission-section">
          <div className="container">
            <div className="mission-content">
              <div className="mission-text">
                <h2>Our Mission</h2>
                <p>
                  At RecruitConnect, our mission is to bridge the gap between
                  job seekers and employers, providing a seamless and efficient
                  platform for job matching and career growth. We strive to
                  empower individuals to find their dream jobs and help
                  companies find the best talent.
                </p>
                <ul className="mission-points">
                  <li>Revolutionize the job search process</li>
                  <li>Foster career development and growth</li>
                  <li>Promote diversity and inclusion in the workplace</li>
                  <li>
                    Provide data-driven insights for better hiring decisions
                  </li>
                </ul>
                <a href="/about" className="learn-more-btn">
                  Learn More About Us
                </a>
              </div>
              <div className="mission-image">
                <img
                  src="https://images.pexels.com/photos/5256819/pexels-photo-5256819.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Team collaborating"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <AwardsSection />
      </AnimatedSection>

<AnimatedSection>
  <section className="top-companies">
    <div className="container">
      <h2>Top Companies We've Worked With</h2>
      <div className="companies-content">
        <div className="company">
          <img
            src="https://t3.ftcdn.net/jpg/03/99/04/82/240_F_399048295_bQCz5V7M2QZVnuv07lwHuMiQsR4X6o7X.jpg"
            alt="Company 1"
          />
          <span className="company-name">Amazon</span>
        </div>
        <div className="company">
          <img
            src="https://t3.ftcdn.net/jpg/05/48/51/50/240_F_548515067_ds7TtH2FI2fNVE9MCWkgNHJhDMWBrVmL.jpg"
            alt="Company 2"
          />
          <span className="company-name">Pinterest</span>
        </div>
        <div className="company">
          <img
            src="https://t3.ftcdn.net/jpg/02/95/55/04/240_F_295550479_L7LYPxN9NYgCDjEXCDYREkbXTaFKrBb2.jpg"
            alt="Company 3"
          />
          <span className="company-name">Google</span>
        </div>
        <div className="company">
          <img
            src="https://t3.ftcdn.net/jpg/02/97/73/28/240_F_297732896_pbAY87SnXyhhhgIOavV2PolvM7LUJ5ey.jpg"
            alt="Company 4"
          />
          <span className="company-name">Microsoft</span>
        </div>
      </div>
    </div>
  </section>
</AnimatedSection>


      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection>
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-grid">
              <div className="stat-item">
                <Search size={48} />
                <h3>10,000+</h3>
                <p>Job Listings</p>
              </div>
              <div className="stat-item">
                <Briefcase size={48} />
                <h3>5,000+</h3>
                <p>Companies</p>
              </div>
              <div className="stat-item">
                <Users size={48} />
                <h3>1M+</h3>
                <p>Job Seekers</p>
              </div>
              <div className="stat-item">
                <TrendingUp size={48} />
                <h3>500K+</h3>
                <p>Placements</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Landing;

