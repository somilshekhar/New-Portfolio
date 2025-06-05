import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Mobile Application developer-(Intern) </h4>
                <h5>Brainy Beams</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              As a mobile application developer, I focus on designing, developing, and maintaining high-quality, user-centric apps. I collaborate closely with cross-functional teams to deliver seamless and reliable mobile solutions that align with business goals.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer-(Intern)</h4>
                <h5>Maddys Technologies</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              As a Software Engineer, I specialize in designing, developing, and optimizing scalable solutions that enhance operational efficiency. I collaborate with cross-functional teams to build robust and reliable systems with a strong focus on performance, security, and long-term maintainability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance & Upskilling</h4>
                <h5>Freelance</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Freelancing gives me the space to grow—both as a developer and a problem-solver. I’m constantly learning, adapting, and striving to bring fresh ideas and better outcomes to every client I work with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
