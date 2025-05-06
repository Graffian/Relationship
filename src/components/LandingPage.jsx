import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import love1 from '../assets/love1.jpg';
import love2 from '../assets/love2.jpg';
import love3 from '../assets/love3.jpg';
import love4 from '../assets/love4.jpg';
import love5 from '../assets/love5.jpg';
import meetMeHalfway from '../assets/meet-me-halfway.mp3';

const LandingPage = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleQuizClick = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    navigate('/quiz');
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = 43;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="landing-container">
      <audio 
        ref={audioRef}
        src={meetMeHalfway}
        loop
        className="background-music"
      />

      <div className="audio-controls">
        <button className="music-button" onClick={toggleMusic}>
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>
      </div>

      <div className="hero-section">
        <h1 className="main-title">Snehaaaaa & Ayushhh</h1>
        <p className="subtitle">The Coolest couple In the town</p>
      </div>

      <div className="story-section">
        <div className="image-container">
          <img src={love1} alt="Our Love Story" className="story-image" />
        </div>
        <div className="text-content">
          <h2>From Friends to Forever</h2>
          <p>
            Sneha i know humare bohot jhagde hote hai kabhi mai hurt hojata hu kabhhi tu hurt hojati hai 
            but i guess this is a part of our relationship and like jhagadne par mujhe kabhi acha feel nahi hua 
            i always wanted to talk to you, you are my very first girlfriend so i am new to all this and im learning 
            what makes you feel good what makes you feel bad i promise you i will improve over time and we would not 
            have any more jhagde i love you.
          </p>
        </div>
      </div>

      <div className="promise-section">
        <div className="text-content">
          <h2>My Promise to You</h2>
          <p>
            No matter what life brings, kuchh b hojaye, I'll always be by your side. 
            jab tu khush hoti hai tabhi mai khus hota hu, and i think mene ye bhot kam baar bola hai 
            but i really really do like ur smile and idk tu kyu bolti tu achi ni dikhti because i swear yaar 
            ki tu bhooooot jyaaadaa cute aur hot dikhti i fucking swear it on my life, 
            I promise to love you unconditionally, to forgive, to understand you and to never give up on you.
          </p>
        </div>
        <div className="image-container">
          <img src={love2} alt="Our Promise" className="story-image" />
        </div>
      </div>

      <div className="quiz-section">
        <h2 className="quiz-title">This is not it meri pyaaariii cutu</h2>
        <button className="quiz-button" onClick={handleQuizClick}>Take Quiz</button>
        <p className="quiz-hint">there is something better than what you have seen till now</p>
      </div>

      <div className="gallery-section">
        <h2>Our Gallery</h2>
        <p className="gallery-note">my bad agar ye photos ache ni lage i swearr i improve everytime you shout at me before taking pics</p>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src={love3} alt="Our Memories" />
          </div>
          <div className="gallery-item">
            <img src={love4} alt="Our Memories" />
          </div>
          <div className="gallery-item">
            <img src={love5} alt="Our Memories" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 