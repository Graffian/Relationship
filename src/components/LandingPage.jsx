import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1 className="main-title">Snehuzz & Niggi</h1>
        <p className="subtitle">A Love Story That Started With Friendship</p>
      </div>

      <div className="story-section">
        <div className="image-container">
          <img src="/src/assets/love1.jpg" alt="Our Love Story" className="story-image" />
        </div>
        <div className="text-content">
          <h2>From Friends to Forever</h2>
          <p>
            What began as a beautiful friendship blossomed into something magical. 
            Through every moment, every laugh, and every tear, we've grown together, 
            building a bond that's unbreakable.
          </p>
        </div>
      </div>

      <div className="promise-section">
        <div className="text-content">
          <h2>My Promise to You</h2>
          <p>
            No matter what life brings, I'll always be by your side. 
            Your happiness is my happiness, and your smile is my world. 
            I promise to love you unconditionally, to forgive, to understand, 
            and to cherish every moment we share together.
          </p>
        </div>
        <div className="image-container">
          <img src="/src/assets/love2.jpg" alt="Our Promise" className="story-image" />
        </div>
      </div>

      <div className="quiz-section">
        <h2 className="quiz-title">This is not it meri pyaaariii cutu</h2>
        <button className="quiz-button">Take Quiz</button>
        <p className="quiz-hint">Ye quiz lele, there is something better than what you have ever seen</p>
      </div>

      <div className="gallery-section">
        <h2>Our Journey Together</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="/src/assets/love3.jpg" alt="Our Memories" />
          </div>
          <div className="gallery-item">
            <img src="/src/assets/love4.jpg" alt="Our Memories" />
          </div>
          <div className="gallery-item">
            <img src="/src/assets/love5.jpg" alt="Our Memories" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 