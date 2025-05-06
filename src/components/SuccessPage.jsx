import React, { useState, useEffect, useRef } from 'react';
import './SuccessPage.css';
import LoveRunner from './LoveRunner';

const SuccessPage = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [loveMeter, setLoveMeter] = useState(0);
  const [showMeter, setShowMeter] = useState(false);
  const [formData, setFormData] = useState({
    jan1st: '',
    firstKiss: '',
    cuttack: ''
  });
  const audioRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Start music
    if (audioRef.current) {
      audioRef.current.currentTime = 10; // Start from 10 seconds
      audioRef.current.play();
    }

    // Calculate time until anniversary
    const calculateTimeLeft = () => {
      const now = new Date();
      const anniversary = new Date(now.getFullYear(), 10, 25); // November 25
      
      if (now > anniversary) {
        anniversary.setFullYear(now.getFullYear() + 1);
      }

      const difference = anniversary - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleMeterClick = () => {
    setShowMeter(true);
    setLoveMeter(0);
    const interval = setInterval(() => {
      setLoveMeter(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your email
    // For now, we'll just log it
    console.log('Form submitted:', formData);
    alert('Your message has been sent to Ayushkant!');
  };

  return (
    <div className="success-container">
      <audio 
        ref={audioRef}
        src="/src/assets/darling.mp3"
        loop
        className="background-music"
        autoPlay
        preload="auto"
      />

      <div className="countdown-section">
        <h2>Our First Date Anniversary</h2>
        <p>First Date: November 25, 2024</p>
        <div className="countdown-timer">
          <div className="time-block">
            <span>{timeLeft.days}</span>
            <p>Days</p>
          </div>
          <div className="time-block">
            <span>{timeLeft.hours}</span>
            <p>Hours</p>
          </div>
          <div className="time-block">
            <span>{timeLeft.minutes}</span>
            <p>Minutes</p>
          </div>
          <div className="time-block">
            <span>{timeLeft.seconds}</span>
            <p>Seconds</p>
          </div>
        </div>
      </div>

      <div className="video-section">
        <h2>Here is a gift for my baby</h2>
        <div className="video-container">
          <video controls loop autoPlay>
            <source src="/src/assets/special-moment.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="message-section">
        <p>
          You are everything I ever wanted. Kuch bhi hojaye jitne b jhagde ho, I always found my peace within you. 
          I always liked talking to you and jab humara jhagda hota h, I am just disappointed but even when I am 
          disappointed, kahi na kahi mujhe terese hi baat krni hoti h.
        </p>
      </div>

      <div className="love-meter-section">
        <button 
          className="love-meter-button"
          onClick={handleMeterClick}
          disabled={showMeter}
        >
          See how much Ayushkant actually loves you
        </button>
        
        {showMeter && (
          <div className="meter-container">
            <div className="meter">
              <div 
                className="meter-fill"
                style={{ width: `${loveMeter}%` }}
              />
            </div>
            <span className="meter-text">{loveMeter}%</span>
            {loveMeter === 100 && (
              <p className="meter-message">
                This meter has limits but my love for you has no limits. 
                It's like infinite hai tere liye, it will never end.
              </p>
            )}
          </div>
        )}
      </div>

      <LoveRunner />

      <div className="trivia-section">
        <h2>Our Special Memories</h2>
        <form onSubmit={handleSubmit}>
          <div className="trivia-question">
            <label>Do you remember Jan 1st?</label>
            <textarea
              value={formData.jan1st}
              onChange={(e) => setFormData({...formData, jan1st: e.target.value})}
              placeholder="Share your memory..."
            />
          </div>
          <div className="trivia-question">
            <label>Remember when we first kissed?</label>
            <textarea
              value={formData.firstKiss}
              onChange={(e) => setFormData({...formData, firstKiss: e.target.value})}
              placeholder="Share your memory..."
            />
          </div>
          <div className="trivia-question">
            <label>Wo Cuttack wala incident to yaad hi hoga?</label>
            <textarea
              value={formData.cuttack}
              onChange={(e) => setFormData({...formData, cuttack: e.target.value})}
              placeholder="Share your memory..."
            />
          </div>
          <button type="submit" className="submit-button">Post</button>
        </form>
      </div>

      <div className="timeline-section">
        <h2>Our Timeline</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">November 25, 2024</div>
            <div className="timeline-content">
              <h3>First Date</h3>
              <div className="timeline-gallery">
                <div className="timeline-image">
                  <img src="/src/assets/timeline/first-date-1.jpg" alt="First Date" />
                </div>
                <div className="timeline-image">
                  <img src="/src/assets/timeline/first-date-2.jpg" alt="First Date" />
                </div>
                <div className="timeline-image">
                  <img src="/src/assets/timeline/first-date-3.jpg" alt="First Date" />
                </div>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">November 24, 2024</div>
            <div className="timeline-content">
              <h3>First Kiss</h3>
              <div className="timeline-message">
                <p>Sneaky first kiss tha but surely memorable for me ❤️</p>
              </div>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">May 1-3, 2025</div>
            <div className="timeline-content">
              <h3>First Big Event Together</h3>
              <div className="timeline-gallery">
                <div className="timeline-image">
                  <img src="/src/assets/timeline/big-event-1.jpg" alt="Big Event" />
                </div>
                <div className="timeline-image">
                  <img src="/src/assets/timeline/big-event-2.jpg" alt="Big Event" />
                </div>
                <div className="timeline-image">
                  <img src="/src/assets/timeline/big-event-3.jpg" alt="Big Event" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="heartfelt-message">
        <p>
          Sneha i know i have said many things to you and i know it still haunts you but seriously bolu to its always its like i want to stay with you no matter what happens kuch b hojaye merepe ho ya terepe we will go through our problems together i always have a soft spot for you i cry for you, i miss you everyday when i am not with you but when i am with you i really do enjoy every bit muje to tuje chhodke jane ka mann ni krta. From the day we first kissed to today mera pyar has never decreased jitne b jhgde ho my love for you has increased i care for u even more i love you so so much sneha please do not blame yourself for anything ever you have been through a lot i know i have heard everything and still its you i want nobody else it has always been you from the start to now i really really want to do all i can to make you feel special because you are special sneha very very special for me, i will always be by your side always and forever
        </p>
      </div>

    </div>
  );
};

export default SuccessPage; 